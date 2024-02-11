enum AstralObjectType {
  SPACE = 'SPACE',
  POLYANET = 'POLYANET',
}

interface Position {
  row: number
  col: number
}

type Polyanet = {
  row: number;
  col: number;
};

type AstralMap = AstralObjectType[][];

export {
  AstralObjectType,
  type Polyanet,
  type Position,
  type AstralMap
};
