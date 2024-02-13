import megaverseApiClient from '../base/megaverseApiClient';
import { SoloonColor, type Position } from '../types';
import BaseAstralObjectService from './baseAstralObjectService';

class SoloonsService extends BaseAstralObjectService {
  path = 'soloons';

  createAstralObject = async (
    position: Position,
    { color }: { color: SoloonColor}
  ): Promise<boolean> => {
    return this._createAstralObject(position, { color });
  };
}

const soloonsService = new SoloonsService(megaverseApiClient);

export default SoloonsService;
export {
  soloonsService
};
