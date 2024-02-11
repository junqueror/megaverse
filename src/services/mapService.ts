import { type AxiosInstance } from 'axios';
import megaverseApiClient from '../base/megaverseApiClient';
import { AstralMap, AstralObjectType } from '../types';
import megaverseConfig from '../config/megaverse';

const MAP_ROWS = megaverseConfig.MAP_LAYOUT.ROWS;
const MAP_COLS = megaverseConfig.MAP_LAYOUT.COLS;

class MapService {
  static paths = {
    map: (candidateId: string) => `map/${candidateId}`,
    goalMap: (candidateId: string) => `map/${candidateId}/goal`
  };

  apiClient: AxiosInstance;

  constructor (apiClient: AxiosInstance) {
    this.apiClient = apiClient;
  }

  getMap = async (candidateId): Promise<AstralMap> => {
    const result = await this.apiClient.get(MapService.paths.map(candidateId));

    return this._formatContentToAstralMap(result.data?.map?.content || []);
  };

  getGoalMap = async (candidateId): Promise<AstralMap> => {
    const result = await this.apiClient.get(MapService.paths.goalMap(candidateId));

    return result.data.goal;
  };

  private _formatContentToAstralMap = (content = []): AstralMap => {
    const astralMap: AstralMap = new Array(MAP_ROWS)
      .fill(null).map(() => new Array(MAP_COLS)
        .fill(AstralObjectType.SPACE));

    for (let row = 0; row < MAP_ROWS; row++) {
      for (let col = 0; col < MAP_COLS; col++) {
        const astralObject = content[row][col] || { type: -1 };

        // Check if is Polyanet (we only manage Polyanets for now)
        if (astralObject?.type === 0) { // I think the API is not consistent,
          // since /map/:candidateId enpoint is returning 0 as the type of Polyanet, but /map/:candidateId/goal is returning 'POLYANET' as the type of Polyanet
          // In case of managing more astral types I would use a new type for astral objets, whcih is not the best approach
          astralMap[row][col] = AstralObjectType.POLYANET;
        } else {
          astralMap[row][col] = AstralObjectType.SPACE;
        }
      }
    }

    return astralMap;
  };
}

const mapService = new MapService(megaverseApiClient);

export default MapService;
export {
  mapService
};
