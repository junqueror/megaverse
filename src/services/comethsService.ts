import megaverseApiClient from '../base/megaverseApiClient';
import { ComethDirection, type Position } from '../types';
import BaseAstralObjectService from './baseAstralObjectService';

class ComethsService extends BaseAstralObjectService {
  path = 'comeths';

  createAstralObject = async (
    position: Position,
    { direction }: { direction: ComethDirection}
  ): Promise<boolean> => {
    return this._createAstralObject(position, { direction });
  };
}

const comethsService = new ComethsService(megaverseApiClient);

export default ComethsService;
export {
  comethsService
};
