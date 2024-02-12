import { FC } from 'react';
import clsx from 'clsx';
import { type AstralObject as AstralObjectType, AstralObjectType as AstralObjectTypeType } from '../types/megaverseTypes';
import AstralObject from './AstralObject';

interface AstralComethProps {
  astralObject: AstralObjectType,
  className?: string,
}

const AstralCometh: FC<AstralComethProps> = ({
  astralObject,
  className = ''
}) => {
  const symbolClasses = clsx({
    'rotate-135': astralObject.type === AstralObjectTypeType.RIGHT_COMETH,
    'rotate-45': astralObject.type === AstralObjectTypeType.UP_COMETH,
    'rotate-225': astralObject.type === AstralObjectTypeType.DOWN_COMETH,
    'rotate-315': astralObject.type === AstralObjectTypeType.LEFT_COMETH
  });

  return (
    <AstralObject
      className={ className }
      symbolClassName={ symbolClasses }
      astralObject={ astralObject }
    />
  );
};

export default AstralCometh;
