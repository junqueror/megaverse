const MEGAVERSE_API_URL = process.env.MEGAVERSE_API_URL;
const MEGAVERSE_API_BASE_URL = `${MEGAVERSE_API_URL}/api`;

const megaverseConfig = {
  API_URL: MEGAVERSE_API_URL,
  BASE_URL: MEGAVERSE_API_BASE_URL,
  MAP_LAYOUT: {
    ROWS: 11,
    COLS: 11
  }
};

export default megaverseConfig;
