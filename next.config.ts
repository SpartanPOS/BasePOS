const {NextFederationPlugin} = require('@module-federation/nextjs-mf');
import runtime from './src/lib/runtime';

function ModuleManage() {
  console.log('starting runtime for :', runtime.runtimeName);

  return {

  };
}

export default ModuleManage;
