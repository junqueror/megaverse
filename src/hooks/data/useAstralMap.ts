import useSWR from 'swr';
import { BaseAstralObjectService, comethsService, mapService, polyanetsService, soloonsService } from '../../services';
import { AstralMap, AstralObjectType } from '../../types';
import { useCallback, useMemo } from 'react';

const astralObjectTypeToService: Record<AstralObjectType, BaseAstralObjectService> = {
  [AstralObjectType.SPACE]: undefined,
  [AstralObjectType.POLYANET]: polyanetsService,
  [AstralObjectType.WHITE_SOLOON]: soloonsService,
  [AstralObjectType.RED_SOLOON]: soloonsService,
  [AstralObjectType.BLUE_SOLOON]: soloonsService,
  [AstralObjectType.PURPLE_SOLOON]: soloonsService,
  [AstralObjectType.RIGHT_COMETH]: comethsService,
  [AstralObjectType.LEFT_COMETH]: comethsService,
  [AstralObjectType.UP_COMETH]: comethsService,
  [AstralObjectType.DOWN_COMETH]: comethsService
};

const useAstralMap = () => {
  const { data, error, isLoading, mutate } = useSWR(
    mapService.paths.map(),
    mapService.getMap,
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: true
    }
  );

  const astralMap: AstralMap = useMemo(() => data || [], [data]);

  console.log('astramlMap data', data);
  console.log('astramlMap astralMap', astralMap);

  // Reset

  // TODO: This is breaking because of 429 errors. One possible solution (path) ws proposed in phase 1, but it should be fixed in backend and also provide a way to reset the map for this feature to work.
  const resetAstralMap = useCallback(() => astralMap.reduce((allAstralObjects, row) => allAstralObjects.concat(row), [])
    .filter(astralObject => astralObject.type !== AstralObjectType.SPACE)
    .forEach(astralObject => astralObjectTypeToService[astralObject.type]?.deleteAstralObject(astralObject.position)),
  [astralMap]);

  return {
    astralMap,
    error,
    isError: !!error,
    isLoading,
    fetchAstralMap: () => mutate(),
    resetAstralMap
  };
};

export default useAstralMap;
