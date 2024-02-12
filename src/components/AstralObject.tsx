import React, { FC } from 'react';
import { type AstralObject as AstralObjectType } from '../types';
import clsx from 'clsx';

interface AstralObjectProps {
  astralObject: AstralObjectType,
  className?: string,
  symbolClassName?: string,
}

const AstralObject: FC<AstralObjectProps> = ({
  astralObject,
  className = '',
  symbolClassName
}) => {
  const astralObjectClasses = clsx(
    'flex items-center justify-center rounded-sm bg-gray-900 p-2 font-bold',
    'hover:bg-gray-800',
    className
  );

  const symbolClasses = clsx(
    'size-3 text-sm',
    symbolClassName
  );

  return (
    <button
      type="button"
      className={ astralObjectClasses }
    >
        <span className={ symbolClasses }>
          { astralObject.symbol }
        </span>
    </button>
  );
};

export default AstralObject;
