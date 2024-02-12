import useSWR from 'swr';
import { mapService } from '../../services';
import { AstralMap } from '../../types';

const useGoalMap = () => {
  const { data, error, isLoading, mutate } = useSWR(
    mapService.paths.goalMap(),
    mapService.getGoalMap
  );

  const goalMap: AstralMap = data || [];

  console.log('Map', goalMap);

  return {
    goalMap,
    error,
    isError: !!error,
    isLoading,
    fetchMap: mutate
  };
};

export default useGoalMap;
