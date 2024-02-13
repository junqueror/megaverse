import { FC } from 'react';
import { AstralMap, MegaverseController } from '../components';
import useMegaverseContext from '../contexts/megaverseContext/megaverseContext';

interface Phase2PageProps {
}

const Phase2Page: FC<Phase2PageProps> = () => {
  const { astralMap, goalMap, shouldShowGoalMap } = useMegaverseContext();
  const mapToShow = shouldShowGoalMap ? goalMap : astralMap;

  return (
    <div className='flex flex-col gap-16 py-16'>
      <MegaverseController />
      <AstralMap
        astralMap={ mapToShow }
        isDisabled={ shouldShowGoalMap }
      />
    </div>
  );
};

export default Phase2Page;
