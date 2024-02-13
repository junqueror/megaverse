import React, { FC, useCallback } from 'react';
import {
  AstralObjectType as AstralObjectTypeType,
  type AstralObject as AstralObjectType
} from '../types';
import clsx from 'clsx';
import useAstralObject from '../hooks/data/useAstralObject';

interface AstralObjectProps {
  astralObject: AstralObjectType,
  className?: string,
  symbolClassName?: string,
  isDisabled?: boolean
}

const AstralObject: FC<AstralObjectProps> = ({
  astralObject,
  className = '',
  symbolClassName = '',
  isDisabled = false
}) => {
  const {
    createPolyanet, deletePolyanet,
    createSoloon, deleteSoloon,
    createCometh, deleteCometh,
    isCreateError, isDeleteError,
    isCreateLoading, isDeleteLoading
  } = useAstralObject(astralObject);

  const isError = isCreateError || isDeleteError;
  const isLoading = isCreateLoading || isDeleteLoading;

  const createNextAstralObject = useCallback((event) => {
    event.preventDefault();

    const clickActionMap = {
      [AstralObjectTypeType.SPACE]: () => createPolyanet(),
      [AstralObjectTypeType.POLYANET]: () => createSoloon('red'),
      [AstralObjectTypeType.RED_SOLOON]: () => createSoloon('blue'),
      [AstralObjectTypeType.BLUE_SOLOON]: () => createSoloon('purple'),
      [AstralObjectTypeType.PURPLE_SOLOON]: () => createSoloon('white'),
      [AstralObjectTypeType.WHITE_SOLOON]: () => createCometh('up'),
      [AstralObjectTypeType.UP_COMETH]: () => createCometh('right'),
      [AstralObjectTypeType.RIGHT_COMETH]: () => createCometh('down'),
      [AstralObjectTypeType.DOWN_COMETH]: () => createCometh('left'),
      [AstralObjectTypeType.LEFT_COMETH]: () => createPolyanet()
    };

    const action = clickActionMap[astralObject.type] || (() => {});
    return action();
  }, [
    astralObject.type,
    createPolyanet,
    createSoloon,
    createCometh
  ]);

  const deleteAstralObject = useCallback((event) => {
    event.preventDefault();

    const rightClickActionMap = {
      [AstralObjectTypeType.POLYANET]: deletePolyanet,
      [AstralObjectTypeType.RED_SOLOON]: deleteSoloon,
      [AstralObjectTypeType.BLUE_SOLOON]: deleteSoloon,
      [AstralObjectTypeType.PURPLE_SOLOON]: deleteSoloon,
      [AstralObjectTypeType.WHITE_SOLOON]: deleteSoloon,
      [AstralObjectTypeType.UP_COMETH]: deleteCometh,
      [AstralObjectTypeType.RIGHT_COMETH]: deleteCometh,
      [AstralObjectTypeType.DOWN_COMETH]: deleteCometh,
      [AstralObjectTypeType.LEFT_COMETH]: deleteCometh
    };

    const action = rightClickActionMap[astralObject.type] || (() => {});

    return action();
  }, [
    astralObject.type,
    deletePolyanet,
    deleteSoloon,
    deleteCometh
  ]);

  const astralObjectClasses = clsx(
    'flex items-center justify-center rounded-sm bg-gray-900 pb-3 pl-2 pr-3 pt-2 font-bold',
    'hover:bg-gray-800 [&>span]:hover:scale-110',
    className, {
      'bg-red-500': isError,
      'animate-pulse': isLoading,
      'cursor-not-allowed': isDisabled || isLoading
    }
  );

  const symbolClasses = clsx(
    'size-3 text-sm',
    symbolClassName, {
      'cursor-not-allowed': isDisabled || isLoading
    }
  );

  return (
    <button
      type="button"
      className={ astralObjectClasses }
      onClick={ createNextAstralObject }
      onContextMenu={ deleteAstralObject }
      disabled={ isDisabled || isLoading }
    >
        <span className={ symbolClasses }>
          { astralObject.symbol }
        </span>
    </button>
  );
};

export default AstralObject;
