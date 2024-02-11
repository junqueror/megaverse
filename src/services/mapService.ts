import { type AxiosInstance } from 'axios';
import megaverseApiClient from '../base/megaverseApiClient';
import { AstralMap, AstralObject, AstralObjectType, astralTypeSymbolMap } from '../types';

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

    return this._formatGoalToAstralMap(result.data?.goal || []);
  };

  private _formatContentToAstralMap = (content = []): AstralMap => content.map((row, rowIndex) => row.map((_astralObject, colIndex) => {
    const astralObject = _astralObject || { type: -1 };

    // Check if is Polyanet (we only manage Polyanets for now)
    // I think the API is not consistent,
    // since /map/:candidateId enpoint is returning 0 as the type of Polyanet, but /map/:candidateId/goal is returning 'POLYANET' as the type of Polyanet
    // In case of managing more astral types I would use a new type for astral objets, whcih is not the best approach
    const astralObjectType = astralObject?.type === 0 ? AstralObjectType.POLYANET : AstralObjectType.SPACE; // TODO: Create a map of astral ids to astral types (when more types are added)

    return {
      type: astralObjectType,
      position: { row: rowIndex, col: colIndex },
      symbol: astralTypeSymbolMap[astralObjectType]
    };
  }));

  private _formatGoalToAstralMap = (map = []): AstralMap => this._iterateMap(map, (astralObject, row, col) => ({
    type: astralObject as AstralObjectType,
    position: { row, col },
    symbol: astralTypeSymbolMap[astralObject]
  }));

  private _iterateMap = (
    map: [][],
    modfier: (_astro: string, _row, _col) => AstralObject
  ) : AstralMap => map.map((row, rowIndex) => row.map((astralObject, colIndex) => modfier(astralObject, rowIndex, colIndex)));
}

const mapService = new MapService(megaverseApiClient);

export default MapService;
export {
  mapService
};
