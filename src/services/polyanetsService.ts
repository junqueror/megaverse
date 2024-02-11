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

  // NOTE: I think POST method for creating a polyanet is not well implemented. It should return the created polyanet, but it returns a 200 OK status code with no body.
  // In that case, the method should be like this:

  /*
  createPolyanet = async (position: Position): Promise<Polyanet> => {
    const result = await this.apiClient.post(PolyanetsService.paths.polyanets, {
      row: position.row,
      column: position.col
    });

    return result.data;
  };
   */
}

const polyanetsService = new PolyanetsService(megaverseApiClient);

export default PolyanetsService;
export {
  polyanetsService
};
