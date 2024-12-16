import dynamic from 'next/dynamic';
import React from 'react';

/**
 * gets dynamic view from the server
 * @param {string} viewname
 * @return {React.Component}
 */
export function getView({viewName}: {viewName: string}) {
  return dynamic(() => import(`../../runtime/packages/${viewName}/index`), {
    ssr: true,
  });
}

/**
 * the dynamic viewport for modules to load
 * @param {string} viewname
 * @return {React.JSX.Element}
 */
export default function Page({viewName}: {viewName: string}) {
  const effectiveViewName = viewName;

  const View = getView({viewName: effectiveViewName});

  return (
    <div>
      <View />
    </div>
  );
}
