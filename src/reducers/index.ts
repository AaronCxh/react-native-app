import {combineReducers} from 'redux';
import * as modulesFiles from './modules';

let modules: any = {};

Object.values(modulesFiles.default).forEach((element) => {
  Object.assign(modules, element);
});

export default combineReducers(modules);
