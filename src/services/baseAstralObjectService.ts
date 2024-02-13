import { type AxiosInstance } from 'axios';
import { type Position } from '../types';

class BaseAstralObjectService {
  path = undefined;

  apiClient: AxiosInstance;

  constructor (apiClient: AxiosInstance) {
    this.apiClient = apiClient;
  }

  createAstralObject = async (position: Position, props = {}): Promise<boolean> => {
    return this._createAstralObject(position, props);
  };

  // NOTE: I think POST method for creating a polyanet is not well implemented in API. It should return the created polyanet, but it returns a 200 OK status code with no body.
  // In that case, the method should be like this:

  /*
  createPolyanet = async (position: Position): Promise<Polyanet> => {
    const result = await this.apiClient.post(PolyanetsService.paths.polyanets, {
      row: position.row,
      column: position.col
    });

    // Create the polyanet in our app
    return {
      type: result.data?.type,
      position: {
        row: result.data?.row,
        col: result.data?.column
      },
      symbol: astralTypeSymbolMap[result.data?.type]
    }
  };
   */

  deleteAstralObject = async (position: Position): Promise<boolean> => {
    const result = await this.apiClient.delete(this.path, {
      data: {
        row: position.row,
        column: position.col
      }
    });

    return result.status === 200; // NOTE: I think DELETE method for deleting a cometh should return a 204 No Content status code, but it returns a 200 OK status code.
  };

  _createAstralObject = async (position: Position, props = {}): Promise<boolean> => {
    const result = await this.apiClient.post(this.path, {
      row: position.row,
      column: position.col,
      ...props
    });

    return result.status === 200;
  };
}

export default BaseAstralObjectService;
