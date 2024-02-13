import { FC } from 'react';
import { type AstralObject as AstralObjectType, AstralObjectType as AstralObjectTypeType } from '../types/megaverseTypes';
import clsx from 'clsx';
import AstralObject from './AstralObject';

interface AstralSoloonProps {
  astralObject: AstralObjectType,
  className?: string,
}

const AstralSoloon: FC<AstralSoloonProps> = ({
  astralObject,
  className = ''
}) => {
  const symbolClasses = clsx({
    'brightness-95 grayscale': astralObject.type === AstralObjectTypeType.WHITE_SOLOON,
    'hue-rotate-90 invert': astralObject.type === AstralObjectTypeType.RED_SOLOON,
    'hue-rotate-15 invert': astralObject.type === AstralObjectTypeType.BLUE_SOLOON,
    'hue-rotate-60 invert': astralObject.type === AstralObjectTypeType.PURPLE_SOLOON
  });

  return (
    <AstralObject
      className={ className }
      symbolClassName={ symbolClasses }
      astralObject={ astralObject }
    />
  );
};

export default AstralSoloon;
