const CROSSMINT_CANDIDATE_ID = import.meta.env.VITE_CROSSMINT_CANDIDATE_ID || '';

console.log('ENV', import.meta.env);
console.log('ENV', import.meta.env.VITE_CROSSMINT_CANDIDATE_ID);

const crossmintConfig = {
  CANDIDATE_ID: CROSSMINT_CANDIDATE_ID
};

export default crossmintConfig;
