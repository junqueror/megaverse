import { FC } from 'react';
import { AstralMap, MegaverseController } from '../components';
import useMegaverseContext from '../contexts/megaverseContext/megaverseContext';
import clsx from 'clsx';

interface Phase2PageProps {
}

const Phase2Page: FC<Phase2PageProps> = () => {
  const {
    astralMap, goalMap, shouldShowGoalMap,
    showGoalMap, hideGoalMap
  } = useMegaverseContext();
  const mapToShow = shouldShowGoalMap ? goalMap : astralMap;

  const buttonText = shouldShowGoalMap ? 'hide' : 'show';
  const buttonClickHandler = shouldShowGoalMap ? hideGoalMap : showGoalMap;

  return (
    <div className='flex flex-col gap-16 py-16'>
      <MegaverseController />
      <AstralMap
        astralMap={ mapToShow }
        isDisabled={ shouldShowGoalMap }
      />
      { !!astralMap.length && (
        <div className="flex w-full flex-row justify-end gap-12 rounded-lg bg-gray-900 p-6">
          <div className="flex w-[400px] items-center justify-between gap-4">
              <span className='font-bold'>Goal Map</span>
              <button
                  type="button"
                  className={clsx('rounded-lg', 'bg-gray-700', 'text-white', 'px-4', 'py-2')}
                  onClick={ buttonClickHandler }
              >
                  { buttonText }
              </button>
          </div>
        </div>
      ) }
    </div>
  );
};

export default Phase2Page;
