import useMegaverseContext from '../../contexts/megaverseContext/megaverseContext';
import { comethsService, polyanetsService, soloonsService } from '../../services';
import { SoloonColor, type AstralObject } from '../../types';
import useSWRMutation from 'swr/mutation';

const useAstralObject = (
  astralObject: AstralObject
) => {
  const { fetchAstralMap } = useMegaverseContext();

  // Polyanet

  const createPolyantetStatus = useSWRMutation(
    `create-${polyanetsService.path}`,
    (_key) => polyanetsService.createAstralObject(astralObject.position), {
      onSuccess: fetchAstralMap
    }
  );

  const deletePolyanetStatus = useSWRMutation(
    `delete-${polyanetsService.path}`,
    (_key) => polyanetsService.deleteAstralObject(astralObject.position), {
      onSuccess: fetchAstralMap
    }
  );

  const createPolyanet = createPolyantetStatus.trigger;
  const deletePolyanet = deletePolyanetStatus.trigger;

  // Soloon

  const createSoloonStatus = useSWRMutation(
    `create-${soloonsService.path}`,
    (_key, { arg }) => soloonsService.createAstralObject(astralObject.position, { color: arg }), {
      onSuccess: fetchAstralMap
    }
  );

  const deleteSoloonStatus = useSWRMutation(
    `delete-${soloonsService.path}`,
    () => soloonsService.deleteAstralObject(astralObject.position), {
      onSuccess: fetchAstralMap
    }
  );

  const createSoloon = (color: SoloonColor) => { createSoloonStatus.trigger(color as null); };
  const deleteSoloon = deleteSoloonStatus.trigger;

  // Cometh

  const createComethStatus = useSWRMutation(
    `create-${comethsService.path}`,
    (key, { arg }) => comethsService.createAstralObject(astralObject.position, { direction: arg }), {
      onSuccess: fetchAstralMap
    }
  );

  const deleteComethStatus = useSWRMutation(
    `delete-${comethsService.path}`,
    () => comethsService.deleteAstralObject(astralObject.position), {
      onSuccess: fetchAstralMap
    }
  );

  const createCometh = (direction: string) => { createComethStatus.trigger(direction as null); };
  const deleteCometh = deleteComethStatus.trigger;

  // Common
  const createError = createPolyantetStatus.error || deletePolyanetStatus.error || createSoloonStatus.error || deleteSoloonStatus.error || createComethStatus.error || deleteComethStatus.error;
  const isCreateError = !!createError;
  const isCreateLoading = createPolyantetStatus.isMutating || createSoloonStatus.isMutating || createComethStatus.isMutating;

  const deleteError = deletePolyanetStatus.error || deleteSoloonStatus.error || deleteComethStatus.error;
  const isDeleteError = !!deleteError;
  const isDeleteLoading = deletePolyanetStatus.isMutating || deleteSoloonStatus.isMutating || deleteComethStatus.isMutating;

  return {
    astralObject,
    createPolyanet,
    deletePolyanet,
    createSoloon,
    deleteSoloon,
    createCometh,
    deleteCometh,
    createError,
    isCreateError,
    isCreateLoading,
    deleteError,
    isDeleteError,
    isDeleteLoading
  };
};

export default useAstralObject;
