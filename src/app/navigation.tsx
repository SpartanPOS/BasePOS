import { MutableRefObject, useRef } from 'react';
import runtime from '../../runtime/index.json'
import { error } from 'console';

function getAvailableViews() {
    let availableViews: string[] = []
    runtime.viewModules.forEach((viewModule) =>{
            let filePath = (`../../runtime/packages/${viewModule}/package.json`)
            console.debug(`importing ${viewModule} at ( ${filePath} )`)

            
            import(filePath).then(packagefile => {
                availableViews.push(packagefile.spartanPOS.viewExports);
            }).catch(err => {
                console.error(err)
            })
 
        }
    )
    return availableViews;
}

export default function Page({viewList, curView}: {viewList: MutableRefObject<string[]>, curView: React.MutableRefObject<string>}) {

    const availableViews = getAvailableViews()
    viewList.current = availableViews


    function setActiveView(viewName: string) {
        curView.current = viewName
    }

    

    return (
        <nav>
            {
                viewList.current.map((item) =>{
                    return (
                        <li>
                            <a onClick={(e) => { e.preventDefault(); setActiveView(item)}}>{item}</a>
                        </li>)
                })
            }
        </nav>

    )
    
}