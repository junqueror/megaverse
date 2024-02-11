import { type AxiosInstance } from 'axios';
import megaverseApiClient from '../base/megaverseApiClient';
import { type Position } from '../types';

class PolyanetsService {
  static paths = {
    polyanets: 'polyanets'
  };

  apiClient: AxiosInstance;

  constructor (apiClient: AxiosInstance) {
    this.apiClient = apiClient;
  }

  createPolyanet = async (position: Position): Promise<boolean> => {
    const result = await this.apiClient.post(PolyanetsService.paths.polyanets, {
      row: position.row,
      column: position.col
    });

    return result.status === 200;
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

  deletePolyanet = async (position: Position): Promise<boolean> => {
    const result = await this.apiClient.delete(PolyanetsService.paths.polyanets, {
      data: {
        row: position.row,
        column: position.col
      }
    });

    return result.status === 200; // NOTE: I think DELETE method for deleting a polyanet should return a 204 No Content status code, but it returns a 200 OK status code.
  };
}

const polyanetsService = new PolyanetsService(megaverseApiClient);

export default PolyanetsService;
export {
  polyanetsService
};
