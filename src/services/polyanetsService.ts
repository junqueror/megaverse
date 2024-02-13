import megaverseApiClient from '../base/megaverseApiClient';
import BaseAstralObjectService from './baseAstralObjectService';

class PolyanetsService extends BaseAstralObjectService {
  path = 'polyanets';
}

const polyanetsService = new PolyanetsService(megaverseApiClient);

export default PolyanetsService;
export {
  polyanetsService
};
