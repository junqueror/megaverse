/* eslint-disable import/first */
import * as dotenv from 'dotenv';
dotenv.config();

import crossmintConfig from './config/crossmint';
import MegaverseGame from './controllers/megaverseGame';

const main = async (): Promise<void> => {
  // Create a new game instance
  const megaverseGame = new MegaverseGame(crossmintConfig.CANDIDATE_ID);
  await megaverseGame.init();

  // Render the initial map
  console.log('Initial map:');
  console.log(megaverseGame.renderMap());

  // Render the goal map
  await megaverseGame.getGoalMap();

  console.log('Goal map:');
  console.log(megaverseGame.renderGoalMap());

  // Create the challenge map
  console.log('Creating a new map...');
  await megaverseGame.createMap();

  // Checking the updated map
  await megaverseGame.getMap();

  console.log('Updated map:');
  console.log(megaverseGame.renderMap());

  // Render the challenge result
  const result = megaverseGame.checkMap() ? 'Congrats, you are hired!' : 'Sorry, better find another job...';
  console.log('Challenge result:', result);
};

main();
