import useSWR from 'swr';
import { mapService } from '../../services';
import { AstralMap, AstralObjectType } from '../../types';
import { useMemo } from 'react';

const useGoalMap = () => {
  const { data, error, isLoading, mutate } = useSWR(
    mapService.paths.goalMap(),
    mapService.getGoalMap
  );

  const goalMap: AstralMap = useMemo(() => data || [], [data]);

  const totalGoalAstralObjects: number | undefined = useMemo(() => {
    if (!goalMap?.length) return undefined;
    let total = 0;

    goalMap.forEach((row) => row.forEach((goalAstralObject) => {
      if (goalAstralObject.type !== AstralObjectType.SPACE) {
        total += 1;
      }
    }
    ));

    return total;
  }, [goalMap]);

  return {
    goalMap,
    error,
    isError: !!error,
    isLoading,
    fetchMap: mutate,
    totalGoalAstralObjects
  };
};

export default useGoalMap;
