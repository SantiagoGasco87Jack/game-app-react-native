/**
 * @author Ali Burhan Keskin <alikeskin@milva.com>
*/
import { combineReducers } from 'redux';
import AppReducer from '@modules/app/redux/appSlice';
import PlaygroundReducer from '@modules/playground/redux/playgroundSlice';

export default combineReducers({ 
  AppReducer,
  PlaygroundReducer,
});
