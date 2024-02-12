import useSWR from 'swr';
import { mapService } from '../../services';
import { AstralMap } from '../../types';

const useAstralMap = () => {
  const { data, error, isLoading, mutate } = useSWR(
    mapService.paths.map(),
    mapService.getMap
  );

  const astralMap: AstralMap = data || [];

  return {
    astralMap,
    error,
    isError: !!error,
    isLoading,
    fetchMap: mutate
  };
};

export default useAstralMap;
