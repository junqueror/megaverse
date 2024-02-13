import React, { FC } from 'react';
import { type AstralMap as AstralMapType, AstralObjectSymbol, AstralObject as AstralObjectType } from '../types';
import AstralObject from './AstralObject';
import AstralCometh from './AstralCometh';
import AstralSoloon from './AstralSoloon';

const astralObjectToComponentMap: Record<AstralObjectSymbol, FC> = {
  [AstralObjectSymbol.SPACE]: AstralObject,
  [AstralObjectSymbol.POLYANET]: AstralObject,
  [AstralObjectSymbol.SOLOON]: AstralSoloon,
  [AstralObjectSymbol.COMETH]: AstralCometh
};

interface AstralMapProps {
  astralMap: AstralMapType
  isDisabled?: boolean
}

const AstralMap: FC<AstralMapProps> = ({
  astralMap,
  isDisabled = false
}) => (
  <table className='w-full rounded-lg'>
    <tbody>
      { astralMap?.map((row, rowIndex) => (
        <tr key={`row-${rowIndex}`} className='flex'>
          { row.map((astralObject, colIndex) => {
            const AstralComponent: FC<{
              className: string,
              astralObject: AstralObjectType,
              isDisabled: boolean
            }> = astralObjectToComponentMap[astralObject.symbol] || AstralObject;

            return (
              <td key={`col-${colIndex}`}>
                <AstralComponent
                  className='m-1' // Add className prop here
                  astralObject={ astralObject }
                  isDisabled={ isDisabled }
                />
              </td>
            );
          })}
        </tr>
      )) }
    </tbody>
  </table>
);

export default AstralMap;
