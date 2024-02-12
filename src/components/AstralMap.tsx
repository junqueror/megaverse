import React, { FC } from 'react';
import { type AstralMap as AstralMapType, AstralObjectSymbol } from '../types';
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
}

const AstralMap: FC<AstralMapProps> = ({
  astralMap
}) => {
  console.log('astralMap', astralMap.length, astralMap[0]?.length);

  return (
    <table className='w-full rounded-lg p-2'>
      <tbody>
        {astralMap.map((row, rowIndex) => (
          <tr key={`row-${rowIndex}`} className='flex'>
            { row.map((astralObject, colIndex) => {
              const AstralComponent = astralObjectToComponentMap[astralObject.symbol] || AstralObject;

              return (
                <td key={`col-${colIndex}`}>
                  <AstralComponent
                    className='m-1'
                    astralObject={ astralObject }
                  />
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AstralMap;
