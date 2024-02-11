enum AstralObjectType {
  SPACE = 'SPACE',
  POLYANET = 'POLYANET',
  // SOLOON = 'SOLOON',
  // COMETH = 'COMETH',
}

enum AstralObjectSymbol {
  SPACE = ' ',
  POLYANET = 'Ø',
  // SOLOON = ')',
  // COMETH = '-*',
}

const astralTypeSymbolMap: Record<AstralObjectType, AstralObjectSymbol> = {
  [AstralObjectType.SPACE]: AstralObjectSymbol.SPACE,
  [AstralObjectType.POLYANET]: AstralObjectSymbol.POLYANET
  // [AstralObjectType.SOLOON]: AstralObjectSymbol.SOLOON,
  // [AstralObjectType.COMETH]: AstralObjectSymbol.COMETH
};

interface Position {
  row: number
  col: number
}

type AstralObject = {
  type: AstralObjectType;
  position: Position;
  symbol?: AstralObjectSymbol,
};

type AstralMap = AstralObject[][];

export {
  AstralObjectType,
  AstralObjectSymbol,
  astralTypeSymbolMap,
  type AstralObject,
  type Position,
  type AstralMap
};
