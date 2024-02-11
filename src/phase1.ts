/* eslint-disable import/first */
import * as dotenv from 'dotenv';
dotenv.config();

import crossmintConfig from './config/crossmint';
import MegaverseGame from './controllers/megaverseGame';
import Logger from './logger';
// import SOLUTION_PHASE_1 from './solutionPhase1';

const main = async (): Promise<void> => {
  // Create a new game instance
  const megaverseGame = new MegaverseGame(crossmintConfig.CANDIDATE_ID);
  await megaverseGame.init();

  // Render the initial map
  Logger.info('Initial map:');
  Logger.info(megaverseGame.renderMap());

  // Render the goal map
  await megaverseGame.getGoalMap();

  Logger.info('Goal map:');
  Logger.info(megaverseGame.renderGoalMap());

  // Create the challenge map
  Logger.info('Creating a new map...');

  // from a predefined solution
  // await megaverseGame.generateMap(SOLUTION_PHASE_1);

  // or from the goal map
  const goalAstralObjects = megaverseGame.getGoalAstralObjects();
  await megaverseGame.generateMap(goalAstralObjects);

  Logger.info('Updated map:');
  Logger.info(megaverseGame.renderMap());

  // Render the challenge result
  const isSuccess = megaverseGame.checkMap();
  if (isSuccess) Logger.success('Congrats, you are hired!');
  else Logger.error('Sorry, better luck next time!');
};

main();
