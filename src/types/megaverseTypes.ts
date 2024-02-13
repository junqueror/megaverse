enum AstralObjectType {
  SPACE = 'SPACE',
  POLYANET = 'POLYANET',
  WHITE_SOLOON = 'WHITE_SOLOON',
  RED_SOLOON = 'RED_SOLOON',
  BLUE_SOLOON = 'BLUE_SOLOON',
  PURPLE_SOLOON = 'PURPLE_SOLOON',
  RIGHT_COMETH = 'RIGHT_COMETH',
  LEFT_COMETH = 'LEFT_COMETH',
  UP_COMETH = 'UP_COMETH',
  DOWN_COMETH = 'DOWN_COMETH',
}

enum AstralObjectSymbol {
  SPACE = ' ',
  POLYANET = '🪐',
  SOLOON = '🌕',
  COMETH = '☄️',
}

const astralTypeSymbolMap: Record<AstralObjectType, AstralObjectSymbol> = {
  [AstralObjectType.SPACE]: AstralObjectSymbol.SPACE,
  [AstralObjectType.POLYANET]: AstralObjectSymbol.POLYANET,
  [AstralObjectType.WHITE_SOLOON]: AstralObjectSymbol.SOLOON,
  [AstralObjectType.RED_SOLOON]: AstralObjectSymbol.SOLOON,
  [AstralObjectType.BLUE_SOLOON]: AstralObjectSymbol.SOLOON,
  [AstralObjectType.PURPLE_SOLOON]: AstralObjectSymbol.SOLOON,
  [AstralObjectType.RIGHT_COMETH]: AstralObjectSymbol.COMETH,
  [AstralObjectType.LEFT_COMETH]: AstralObjectSymbol.COMETH,
  [AstralObjectType.UP_COMETH]: AstralObjectSymbol.COMETH,
  [AstralObjectType.DOWN_COMETH]: AstralObjectSymbol.COMETH
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

type SoloonColor = 'red' | 'blue' | 'purple' | 'white';
type ComethDirection = 'right' | 'left' | 'up' | 'down';

type AstralMap = AstralObject[][];

export {
  AstralObjectType,
  AstralObjectSymbol,
  astralTypeSymbolMap,
  type AstralObject,
  type Position,
  type SoloonColor,
  type ComethDirection,
  type AstralMap
};
