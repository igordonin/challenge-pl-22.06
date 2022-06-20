import { combineReducers } from 'redux';
import { User } from '../modules/auth/user';
import authReducer from '../modules/auth/auth.state';
import customersReducer from '../modules/crm/customers.state';
import { Customer } from '../modules/crm/customer';

export interface StoreState {
  customers: Customer[];
  auth: User | null;
}

export const reducers = combineReducers<StoreState>({
  auth: authReducer,
  customers: customersReducer,
});
