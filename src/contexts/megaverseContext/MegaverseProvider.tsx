import React, { FC, ReactNode, useMemo, useState } from 'react';

import { MegaverseContext, type MegaverseContextType } from './megaverseContext';
import { useGoalMap, useAstralMap } from '../../hooks/data';

interface MegaverseProviderProps {
  children: ReactNode
}

const MegaverseProvider: FC<MegaverseProviderProps> = ({ children }) => {
  const { astralMap, fetchAstralMap, resetAstralMap } = useAstralMap();
  const { goalMap } = useGoalMap();
  const [shouldShowGoalMap, setShouldShowGoalMap] = useState(false);

  const contextValue: MegaverseContextType = useMemo(() => ({
    astralMap,
    goalMap,
    fetchAstralMap,
    resetAstralMap,
    shouldShowGoalMap,
    showGoalMap: () => setShouldShowGoalMap(true),
    hideGoalMap: () => setShouldShowGoalMap(false)
  }), [
    astralMap,
    goalMap,
    fetchAstralMap,
    resetAstralMap,
    shouldShowGoalMap,
    setShouldShowGoalMap
  ]);

  return (
    <MegaverseContext.Provider
      value={ contextValue }
    >
      { children }
    </MegaverseContext.Provider>
  );
};

export default MegaverseProvider;
