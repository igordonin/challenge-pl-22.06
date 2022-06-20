import { combineReducers } from 'redux';
import { User } from '../modules/auth/user';
import authReducer from '../modules/auth/auth.state';

export interface StoreState {
  auth: User | null;
}

export const reducers = combineReducers<StoreState>({
  auth: authReducer,
});
