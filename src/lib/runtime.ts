import runtime from '../../runtime/index.json';
import fs from 'node:fs';
import path from 'node:path';

interface view {
  name: string,
  relativePath: fs.PathLike
}

class Runtime {
  readonly availableViews: view[] = [];
  readonly viewModules: string[] = [];
  readonly commandModules: string[] = [];
  readonly commands: string[] = [];
  readonly runtimeName: string = 'SpartanPOS';

  constructor() {
    [this.commandModules, this.viewModules] = this.populateModules();
    this.availableViews = this.generateViewsIndex();
  }

  populateModules() {
    return [runtime.commandModules, runtime.viewModules];
  }

  /** grabs viewExports from each viewModule's package.json. Will make it where it can also
   * grab from view folder if dev chooses to do so
   *
   *
   *
   * @return string[]
   */
  generateViewsIndex() {
    console.info('Generating views index');
    const rootDir = path.join(__dirname, '../../runtime/packages');
    const availableViews = [];
    for (const moduleName of this.viewModules) {
      console.info('View module: ' + moduleName);
      const modulePath = path.join(rootDir, moduleName);

      if (fs.existsSync(modulePath)) {
        const module = require(path.join(rootDir, moduleName, 'package.json'));

        for (const viewName in module.spartanPOS.viewExports) {
          console.debug('View: ' + viewName);

          if (fs.existsSync(path.join(modulePath, viewName))) {
            availableViews.push({name: viewName, relativePath: path.join(modulePath, viewName)});
          } else {
            console.warn('View ' + viewName + ' not found in module ' + module.name);
          }
        }
      } else {
        console.error('Module ' + moduleName + ' not found');
      }
    }
    return availableViews;
  }
}

export default new Runtime();
