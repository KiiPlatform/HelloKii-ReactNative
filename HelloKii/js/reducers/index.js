'use strict';

import { combineReducers } from 'redux';

import drawer from './drawer';
import route from './route';
import items from './items';

export default combineReducers({
  items,
 	drawer,
 	route
})
