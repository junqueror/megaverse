import { type AxiosInstance } from 'axios';
import megaverseApiClient from '../base/megaverseApiClient';
import { AstralMap, AstralObject, AstralObjectType, astralTypeSymbolMap } from '../types';
import crossmintConfig from '../config/crossmint';

class MapService {
  paths = {
    map: (candidateId: string = this.candidateId) => `map/${candidateId}`,
    goalMap: (candidateId: string = this.candidateId) => `map/${candidateId}/goal`
  };

  apiClient: AxiosInstance;
  candidateId: string;

  constructor (apiClient: AxiosInstance, candidateId: string) {
    this.apiClient = apiClient;
    this.candidateId = candidateId;
  }

  getMap = async (): Promise<AstralMap> => {
    const result = await this.apiClient.get(this.paths.map(this.candidateId));

    return this._formatContentToAstralMap(result.data?.map?.content || []);
  };

  getGoalMap = async (): Promise<AstralMap> => {
    const result = await this.apiClient.get(this.paths.goalMap(this.candidateId));

    return this._formatGoalToAstralMap(result.data?.goal || []);
  };

  private _formatContentToAstralMap = (content = []): AstralMap => content.map((row, rowIndex) => row.map((_astralObject, colIndex) => {
    const astralObject = _astralObject || { type: -1 };

    // Check if is Polyanet (we only manage Polyanets for now)
    // I think the API is not consistent,
    // since /map/:candidateId enpoint is returning 0 as the type of Polyanet, but /map/:candidateId/goal is returning 'POLYANET' as the type of Polyanet
    // In case of managing more astral types I would use a new type for astral objets, ehich is not the best approach

    // We need to use a map to covert astral object ids (number) to types (string) to standardize the type of astral objects in our app
    const astralObjectType = this._getAstralObjectType(astralObject);

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

  private _getAstralObjectType ({
    type,
    color = '',
    direction = ''
  }: {
    type: number,
    color: string,
    direction: string,
  }) {
    const astralObjectIdsToTypesMap = {
      0: 'POLYANET',
      1: 'SOLOON',
      2: 'COMETH'
    };

    let astralObjectType = astralObjectIdsToTypesMap[type] || 'SPACE';

    if (astralObjectType === astralObjectIdsToTypesMap[1]) {
      astralObjectType = `${color.toUpperCase()}_${astralObjectType}` as AstralObjectType;
    } else if (astralObjectType === astralObjectIdsToTypesMap[2]) {
      astralObjectType = `${direction.toUpperCase()}_${astralObjectType}` as AstralObjectType;
    }
    return astralObjectType;
  }
}

const mapService = new MapService(megaverseApiClient, crossmintConfig.CANDIDATE_ID);

export default MapService;
export {
  mapService
};
