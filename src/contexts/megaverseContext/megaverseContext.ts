import { createContext, useContext } from 'react';

import { AstralMap } from '../../types';

interface MegaverseContextType {
  astralMap: AstralMap,
  goalMap: AstralMap
  totalGoalAstralObjects?: number
  fetchAstralMap: () => void
  resetAstralMap: () => void
  shouldShowGoalMap: boolean
  showGoalMap: () => void
  hideGoalMap: () => void
}

const defaultState = {
  astralMap: [],
  goalMap: [],
  totalGoalAstralObjects: undefined,
  fetchAstralMap: () => {},
  resetAstralMap: () => {},
  shouldShowGoalMap: false,
  showGoalMap: () => {},
  hideGoalMap: () => {}
};

const MegaverseContext = createContext(defaultState);
MegaverseContext.displayName = 'MegaverseContext';

const useMegaverseContext = () => useContext(MegaverseContext);

export default useMegaverseContext;
export {
  MegaverseContext,
  type MegaverseContextType
};
