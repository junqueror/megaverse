import { FC, useEffect, useState } from 'react';
import clsx from 'clsx';
import useMegaverseContext from '../contexts/megaverseContext/megaverseContext';
import megaverseConfig from '../config/megaverse';

interface MegaverseControllerProps {}

const MegaverseController: FC<MegaverseControllerProps> = () => {
  const { shouldShowGoalMap, showGoalMap, hideGoalMap, resetAstralMap } = useMegaverseContext();
  const [gameTime, setGameTime] = useState(megaverseConfig.GAME.TIME);

  useEffect(() => {
    let timer;

    if (shouldShowGoalMap) {
      timer = setInterval(() => {
        setGameTime((prevTime) => {
          if (prevTime === 0) {
            // When the game time reaches 0
            // Reset the astral map
            resetAstralMap();
            // Show the current astral map
            hideGoalMap();
            // Restart the timer when it reaches 0
            return megaverseConfig.GAME.TIME;
          } else {
            return prevTime - 1;
          }
        });
      }, 1000);
    } else {
      clearInterval(timer);
    }

    return () => {
      clearInterval(timer);
    };
  }, [shouldShowGoalMap, resetAstralMap]);

  const buttonText = shouldShowGoalMap ? 'hide' : 'show';
  const buttonClickHandler = shouldShowGoalMap ? hideGoalMap : showGoalMap;

  return (
        <div className="flex w-full flex-row justify-between gap-4 rounded-lg bg-gray-900 p-4">
            <div>TODO: Explain game rules and controls</div>
            <div className="flex min-w-[200px] flex-col gap-4">
                <div className="flex items-center justify-between gap-4">
                    <span>Time</span>
                    <p>
                        <span className="text-3xl">{gameTime}</span>
                        <span>{' seconds'}</span>
                    </p>
                </div>
                <div className="flex items-center justify-between gap-4">
                    <span>Goal Map</span>
                    <button
                        type="button"
                        className={clsx('rounded-lg', 'bg-gray-700', 'text-white', 'px-4', 'py-2')}
                        onClick={buttonClickHandler}
                    >
                        {buttonText}
                    </button>
                </div>
            </div>
        </div>
  );
};

export default MegaverseController;
