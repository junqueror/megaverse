const MEGAVERSE_API_URL = import.meta.env.VITE_MEGAVERSE_API_URL;
const MEGAVERSE_API_BASE_URL = `${MEGAVERSE_API_URL}/api`;

const megaverseConfig = {
  API_URL: MEGAVERSE_API_URL,
  BASE_URL: MEGAVERSE_API_BASE_URL,
  MAP_LAYOUT: {
    ROWS: 30,
    COLS: 36
  }
};

export default megaverseConfig;
