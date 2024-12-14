import dynamic from 'next/dynamic';



/**
 * gets dynamic view from the server
 * @param params 
 * @returns 
 */
export function getView({viewName}: {viewName: string}) {
    return  dynamic(() => import(`../../runtime/packages/${viewName}/index`), {
        ssr: true 
      });
    
}

/**
 * the dynamic viewport for modules to load
 * @param param0 
 * @returns 
 */
export default function Page({viewName}: {viewName: string}) {

  const effectiveViewName = viewName

  const View =  getView({viewName: effectiveViewName})

  return (
    <div>
      <View />
    </div>
  );
}


