import { FC } from 'react';
import useAstralMap from '../hooks/data/useAstralMap';
import { AstralMap } from '../components';
import { useGoalMap } from '../hooks/data';

interface Phase2PageProps {
}

const Phase2Page: FC<Phase2PageProps> = () => {
  const { astralMap } = useAstralMap();
  const { goalMap } = useGoalMap();

  return (
    <div className='py-16'>
      <AstralMap astralMap={ goalMap} />
    </div>
  );
};

export default Phase2Page;
