import { mapService } from '../services/mapService';
import { polyanetsService } from '../services/polyanetsService';
import megaverseConfig from '../config/megaverse';
import { type AstralMap, AstralObjectType, Position, AstralObject, astralTypeSymbolMap } from '../types';
import axios, { AxiosError } from 'axios';
import { MegaverseGameError, MegaverseApiError } from '../errors/megaverseErrors';

const MAP_ROWS = megaverseConfig.MAP_LAYOUT.ROWS;
const MAP_COLS = megaverseConfig.MAP_LAYOUT.COLS;
const INITIAL_DELAY_BETWEEN_REQUESTS = 3; // seconds
const DELAY_MULTIPLIER_BETWEEN_REQUESTS = 2;
const MAX_RETRIES_REQUESTS = 10;

class MegaverseGame {
  static mapService = mapService;
  static polyanetsService = polyanetsService;

  private candidateId: string;
  private astralMap: AstralMap;
  private goalMap: AstralMap;

  constructor (_candidateId: string) {
    this.candidateId = _candidateId;
    this.astralMap = undefined;
    this.goalMap = undefined;
  }

  async init (): Promise<void> {
    await this.getMap();
    await this.getGoalMap();
  }

  async getMap (): Promise<AstralMap> {
    try {
      this.astralMap = await MegaverseGame.mapService.getMap();
      return this.astralMap;
    } catch (error) {
      this.handleError('Error fetching map', error);
    }
  }

  async getGoalMap (): Promise<AstralMap> {
    try {
      this.goalMap = await MegaverseGame.mapService.getGoalMap();
      return this.goalMap;
    } catch (error) {
      this.handleError('Error fetching goal map', error);
    }
  }

  async generateMap (astralObjects: AstralObject[] = []): Promise<AstralMap> {
    const goalMap = this._createMap(astralObjects);

    try {
      const requests: Promise<AstralObject>[] = this.astralMap
        .reduce((mapRequests: Promise<AstralObject>[], row, rowIndex) => mapRequests
          .concat(row
            .reduce((rowRequests: Promise<AstralObject>[], currentAstralObject, colIndex) => {
              const goalAstralObject = goalMap[rowIndex][colIndex];

              if (goalAstralObject.type === AstralObjectType.POLYANET && currentAstralObject.type !== AstralObjectType.POLYANET) {
              // Check if the goal is a Polyanet and the current is not

                console.log('Creating a polyanet', currentAstralObject.position);
                return [
                  ...rowRequests,
                  this.createPolyanet(currentAstralObject.position)
                ];
              } else if (goalAstralObject.type === AstralObjectType.SPACE && currentAstralObject.type === AstralObjectType.POLYANET) {
              // Check if the goal is a Space and the current is a Polyanet
                console.log('Deleting a polyanet:', currentAstralObject.position);
                return [
                  ...rowRequests,
                  this.deletePolyanet(currentAstralObject.position)
                ];
              } else {
                return rowRequests;
              }
            }, [])), []);

      // Perform all the requests in parallel
      console.log('Number of API requests:', requests.length);
      await Promise.all(requests); // We cannot do it this because of 429 errors returned by the API, but is the best approach in terms of performance

      // Perform the requests sequentially
      await this._doSequentialRequests(requests);

      // Update the map
      await this.getMap();

      return this.astralMap;
    } catch (error) {
      this.handleError('Error generating map', error);
    }
  }

  getGoalAstralObjects (): AstralObject[] {
    return this.goalMap.flat().filter((astralObject) => astralObject.type !== AstralObjectType.SPACE);
  }

  async createPolyanet (position: Position): Promise<AstralObject> {
    const polyanet = this.astralMap[position.row][position.col];

    // Check if the creation is needed
    if (polyanet.type === AstralObjectType.POLYANET) {
      return polyanet; // This way we avoid unecessary requests
    }

    // Create the polyanet
    const result = await MegaverseGame.polyanetsService.createAstralObject(position);

    return result
      ? {
          type: AstralObjectType.POLYANET,
          position,
          symbol: astralTypeSymbolMap[AstralObjectType.POLYANET]
        }
      : polyanet;
  }

  async deletePolyanet (position: Position): Promise<AstralObject> {
    const polyanet = this.astralMap[position.row][position.col];

    // Check if the deletion is needed
    if (polyanet.type !== AstralObjectType.POLYANET) {
      return polyanet; // This way we avoid unecessary requests
    }

    // Delete the polyanet
    const result = await MegaverseGame.polyanetsService.deleteAstralObject(position);

    return result
      ? {
          type: AstralObjectType.SPACE,
          position,
          symbol: astralTypeSymbolMap[AstralObjectType.SPACE]
        }
      : polyanet;
  }

  checkMap (): boolean {
    return JSON.stringify(this.astralMap) === JSON.stringify(this.goalMap);
  }

  renderMap (): string {
    return this._renderMap(this.astralMap);
  }

  renderGoalMap (): string {
    return this._renderMap(this.goalMap);
  }

  private _createMap (astralObjects: AstralObject[] = []): AstralMap {
    const astralMap: AstralMap = new Array(MAP_ROWS)
      .fill(null).map(() => new Array(MAP_COLS)
        .fill({
          type: AstralObjectType.SPACE,
          position: { row: -1, col: -1 },
          symbol: astralTypeSymbolMap[AstralObjectType.SPACE]
        }));

    astralObjects.forEach((astralObject) => {
      astralMap[astralObject.position.row][astralObject.position.col] = astralObject;
    });

    return astralMap;
  }

  private _renderMap (astralMap: AstralMap): string {
    if (!astralMap) {
      return 'Map not loaded yet.';
    }

    let mapString = '';
    for (let row = 0; row < MAP_ROWS; row++) {
      for (let col = 0; col < MAP_COLS; col++) {
        const astralObject = astralMap?.[row]?.[col] || { type: AstralObjectType.SPACE };
        const astralSymbol = astralObject.type === AstralObjectType.POLYANET ? `[${astralObject.symbol}]` : '[ ]';
        mapString += ` ${astralSymbol}`; // Join the astral type with a space to create a grid
      }
      mapString += '\n';
    }
    return mapString;
  }

  private handleError (message: string, error: Error): void {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      throw new MegaverseApiError(message, axiosError?.response?.status);
    } else {
      throw new MegaverseGameError(`${message}: ${error.message}`);
    }
  }

  private async _doSequentialRequests (requests: Promise<AstralObject>[]): Promise<void> {
    for (const request of requests) {
      try {
        await this._retry(() => request);
        await this._sleep(INITIAL_DELAY_BETWEEN_REQUESTS);
        console.log('Request successful');
      } catch (error) {
        console.error('Error during (retry) request:', error);
      }
    }
  }

  private async _retry<T> (func: () => Promise<T>,
    delay = INITIAL_DELAY_BETWEEN_REQUESTS,
    delayMultiplier = DELAY_MULTIPLIER_BETWEEN_REQUESTS,
    maxRetries = MAX_RETRIES_REQUESTS
  ) {
    if (maxRetries <= 0) {
      throw new MegaverseGameError('Max retries exceeded');
    }

    try {
      // Attempt the request
      const result = await func();
      return result; // If successful, return the result
    } catch (error) {
      if ((error.name === MegaverseApiError.name || axios.isAxiosError(error)) && (error.status === 429 || error?.response?.status === 429)) {
        // Retry the request after a delay
        console.log(`Received 429 error. Retrying after ${delay} seconds.`);
        await this._sleep(delay);
        return await this._retry(func, delay * delayMultiplier, delayMultiplier, maxRetries - 1); // Await the recursive call
      } else {
        // If it's not an HTTP 429 error, re-throw the error
        throw error;
      }
    }
  }

  private _sleep (seconds: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
  }
}

export default MegaverseGame;
