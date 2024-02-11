import { mapService } from '../services/mapService';
import { polyanetsService } from '../services/polyanetsService';
import megaverseConfig from '../config/megaverse';
import { type AstralMap, AstralObjectType, Position } from '../types';

const MAP_ROWS = megaverseConfig.MAP_LAYOUT.ROWS;
const MAP_COLS = megaverseConfig.MAP_LAYOUT.COLS;

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
      this.astralMap = await MegaverseGame.mapService.getMap(this.candidateId);
      return this.astralMap;
    } catch (error) {
      console.error('Error fetching map:', error);
    }
  }

  async getGoalMap (): Promise<AstralMap> {
    try {
      this.goalMap = await MegaverseGame.mapService.getGoalMap(this.candidateId);
      return this.goalMap;
    } catch (error) {
      console.error('Error fetching goal map:', error);
    }
  }

  async createMap (): Promise<any> {
    try {
      const position: Position = { row: 10, col: 10 };
      const isPolyanedCreated: boolean = await MegaverseGame.polyanetsService.createPolyanet(position);

      console.log('Polyanet created:', isPolyanedCreated);

      return isPolyanedCreated;
    } catch (error) {
      console.error('Error creating map:', error);
    }
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

  private _renderMap (astralMap: AstralMap): string {
    if (!astralMap) {
      return 'Map not loaded yet.';
    }

    let mapString = '';
    for (let row = 0; row < MAP_ROWS; row++) {
      for (let col = 0; col < MAP_COLS; col++) {
        const astralObject = astralMap?.[row]?.[col] === AstralObjectType.POLYANET ? '[x]' : '[ ]';
        mapString += ` ${astralObject}`; // Join the astral object with a space to create a grid
      }
      mapString += '\n';
    }
    return mapString;
  }
}

export default MegaverseGame;
