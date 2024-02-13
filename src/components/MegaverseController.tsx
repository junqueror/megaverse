import { FC } from 'react';
import clsx from 'clsx';
import useMegaverseContext from '../contexts/megaverseContext/megaverseContext';
import useMegaverseGame from '../hooks/useMegaverseGame';

interface MegaverseControllerProps {}

const MegaverseController: FC<MegaverseControllerProps> = () => {
  const {
    totalGoalAstralObjects, shouldShowGoalMap,
    showGoalMap, hideGoalMap
  } = useMegaverseContext();
  const {
    gameTime,
    identifiedAstralObjects,
    misidentifiedAstralObjects,
    unknownAstralObjects
  } = useMegaverseGame();

  const buttonText = shouldShowGoalMap ? 'hide' : 'show';
  const buttonClickHandler = shouldShowGoalMap ? hideGoalMap : showGoalMap;

  return (
    <div className="flex w-full flex-row justify-between gap-12 rounded-lg bg-gray-900 p-6">
        <div className="flex flex-col gap-2 text-lg">
            <span>👆  Normal click to create the different types of 🪐POLYane, 🌙SOLoons and ☄comETHs</span>
            <span className='ml-8'>- 🌙SOLoons can only be adjacent to a 🪐POLYanet, and they can have a variety of colors.</span>
            <span className='ml-8'>- ☄comETHs can go alone in the universe, but they have a direction they’re facing</span>
            <span>🖕  Right click to delete the astral object and leave a space</span>
            <span>👁️  You can see the goal map by clicking the show button</span>
            <span>⌛  Be careful not to run out of visualization time!</span>
            <span>🏆  Help us to identify all obejcts in the astral map</span>
        </div>
        <div className="flex min-w-[200px] max-w-[400px] flex-1 flex-col gap-4">
            <div className="flex items-center justify-between gap-4">
                <span className='font-bold'>Astral objects found</span>
                <p>
                    <span className="text-3xl">{ identifiedAstralObjects }</span>
                    <span>{ `/${totalGoalAstralObjects} found` }</span>
                </p>
            </div>
            <div className="flex items-center justify-between gap-4">
                <span className='font-bold'>Misidentified astral objects</span>
                <p>
                    <span className="text-3xl">{ misidentifiedAstralObjects }</span>
                    <span>{' misidentified'}</span>
                </p>
            </div>
            <div className="flex items-center justify-between gap-4">
                <span className='font-bold'>Unknown astral objects</span>
                <p>
                    <span className="text-3xl">{ unknownAstralObjects }</span>
                    <span>{' unknown'}</span>
                </p>
            </div>
            <div className="flex items-center justify-between gap-4">
                <span className='font-bold'>Goal map time</span>
                <p>
                    <span className="text-3xl">{ gameTime }</span>
                    <span>{' seconds'}</span>
                </p>
            </div>
            <div className="flex items-center justify-between gap-4">
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
    </div>
  );
};

export default MegaverseController;
