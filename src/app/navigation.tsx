import {MutableRefObject} from 'react';
import runtime from '../../runtime/index.json';
import * as React from 'react';

async function getAvailableViews() {
  const availableViews: string[] = [];
  await Promise.all(
      runtime.viewModules.map(async (viewModule) => {
        const filePath = `../../runtime/packages/${viewModule}/package.json`;
        console.debug(`importing ${viewModule} at ( ${filePath} )`);
        try {
          const packagefile = await import(filePath);
          availableViews.push(packagefile.spartanPOS.viewExports);
        } catch (err) {
          console.error(err);
        }
      }),
  );
  return availableViews;
}

export default async function Page({
  viewList,
  curView,
}: {
  viewList: MutableRefObject<string[]>;
  curView: React.MutableRefObject<string>;
}) {
  const availableViews = await getAvailableViews();
  viewList.current = availableViews;

  const setActiveView = (viewName: string) => {
    curView.current = viewName;
  };
  return (
    <nav>
      {viewList.current.map((item, index) => (
        <li key={index}>
          <a href="#" onClick={(e) => {
            e.preventDefault(); setActiveView(item);
          }}>{item}</a>
        </li>
      ))}
    </nav>
  );
}
