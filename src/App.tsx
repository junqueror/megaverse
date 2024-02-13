import React from 'react';
import siteConfig from './config/site';
import Phase2Page from './pages/phase2';
import MegaverseProvider from './contexts/megaverseContext/MegaverseProvider';

function App () {
  return (
    <>
      <div className='h-full w-screen'>
        <div className='background fixed z-[-1] size-full'/>
        <div className='flex h-full flex-col px-20 py-32'>
          <h1 className='text-4xl font-bold'>
            { siteConfig.TITLE }
          </h1>
          <h2 className='text-2xl font-bold'>
            { siteConfig.SUBTITLE }
          </h2>
          <MegaverseProvider>
            <Phase2Page />
          </MegaverseProvider>
        </div>
      </div>
    </>
  );
}

export default App;
