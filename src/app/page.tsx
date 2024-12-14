'use client'

// app/page.js 
import { useRef, useState } from 'react';
import DynamicView from './dynamicview'
import Navigation from './navigation'

/**homepage and main view of the app
 * @type React.FC
 */
export default function Home({ moduleNames }: { moduleNames: string[] }) {
  const viewList = useRef([""])
  const curView = useRef("default")

  return (
    <div>
      <Navigation viewList={viewList}  curView={curView} />
      <main>
        <DynamicView viewName={curView.current} />
        {/* <Lockscreen /> */}
      </main >
    </div>
  );
};
