import { useCallback, useEffect, useMemo, useState } from 'react';
import useMegaverseContext from '../contexts/megaverseContext/megaverseContext';
import megaverseConfig from '../config/megaverse';
import { AstralObjectType } from '../types';

const useMegaverseGame = () => {
  const {
    astralMap, goalMap, totalGoalAstralObjects, shouldShowGoalMap,
    hideGoalMap, resetAstralMap
  } = useMegaverseContext();
  const [gameTime, setGameTime] = useState(megaverseConfig.GAME.TIME);

  // Game state
  const [identifiedAstralObjects, misidentifiedAstralObjects, unknownAstralObjects] = useMemo(() => {
    let _identified = 0;
    let _missidentified = 0;
    let _unknown = 0;

    if (!goalMap?.length) return [0, 0, 0];
    if (!astralMap?.length) return [0, 0, 0];

    goalMap.forEach((row, rowIndex) => row.forEach((goalAstralObject, colIndex) => {
      const astralObject = astralMap[rowIndex][colIndex];

      // Astral object found in the goal map
      if (goalAstralObject.type !== AstralObjectType.SPACE &&
              goalAstralObject.type === astralObject.type) {
        _identified += 1;

        // Extra unknown astral object found in the goal map
      } else if (astralObject.type !== AstralObjectType.SPACE &&
            goalAstralObject.type === AstralObjectType.SPACE) {
        _unknown += 1;

        // Astral object found in the goal map but misidentified
      } else if (astralObject.type !== AstralObjectType.SPACE &&
                  astralObject.type !== goalAstralObject.type) {
        _missidentified += 1;
      }
    }));

    return [_identified, _missidentified, _unknown];
  }, [astralMap, goalMap]);

  // Game over
  const resetGame = useCallback(async () => {
    // Reset the astral map
    resetAstralMap();

    // Show game over message
    alert('Game Over! You ran out of time. Seems that we have lost some of the astral objects... Try again!');

    // Show the current astral map
    hideGoalMap();
  }, [resetAstralMap, hideGoalMap]);

  useEffect(() => {
    let timer;

    if (shouldShowGoalMap) {
      timer = setInterval(() => {
        setGameTime((prevTime) => {
          if (prevTime === 0) {
            // When the game time reaches 0
            // Restart the game
            resetGame();
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
  }, [
    shouldShowGoalMap,
    resetGame,
    setGameTime
  ]);

  // Game finished
  const endGame = useCallback(() => {
    // Show game over message
    alert('Congratulations! You have built the megaverse! Thanks for your help!');

    // Reset the astral map
    resetAstralMap();
  }, [resetAstralMap]);

  useEffect(() => {
    if (!!totalGoalAstralObjects &&
            identifiedAstralObjects === totalGoalAstralObjects &&
            misidentifiedAstralObjects === 0 &&
            unknownAstralObjects === 0) {
      endGame();
    }
  }, [totalGoalAstralObjects,
    identifiedAstralObjects,
    misidentifiedAstralObjects,
    unknownAstralObjects,
    endGame
  ]);

  return {
    gameTime,
    identifiedAstralObjects,
    misidentifiedAstralObjects,
    unknownAstralObjects
  };
};

export default useMegaverseGame;
