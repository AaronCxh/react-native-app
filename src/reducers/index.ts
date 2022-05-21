import {combineReducers} from 'redux';

const modules: any = {};
const modulesFiles = require.context('./modules', true, /\.js$/);

// console.log('modulesFiles', modulesFiles.keys())
// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
modulesFiles.keys().reduce((module: any, modulePath: any) => {
  const value = modulesFiles(modulePath);
  for (let key in value.default) {
    modules[key] = value.default[key];
  }
}, {});

export default combineReducers(modules);
