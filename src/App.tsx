import React from 'react';
import siteConfig from './config/site';
import Phase2Page from './pages/phase2';

function App () {
  return (
    <>
      <div className='h-full w-screen'>
        <div className='background fixed z-[-1] size-full'/>
        <div className='flex h-full flex-col p-32'>
          <h1 className='text-4xl font-bold'>
            { siteConfig.TITLE }
            </h1>
          <h2 className='text-2xl font-bold'
          >{ siteConfig.SUBTITLE }
          </h2>
          <Phase2Page />
        </div>
      </div>
    </>
  );
}

export default App;
