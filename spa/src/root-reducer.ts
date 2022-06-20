import { combineReducers } from 'redux';
import { User } from './modules/auth/user';
import { Customer } from './modules/crm/customer';
import authReducer from './modules/auth/auth.state';
import customersReducer from './modules/crm/customers.state';
import createUpdateCustomersReducer from './modules/crm/create-update/create-update.state';
import { CreateCustomerStepsModel } from './modules/crm/create-update/customers.types';

export interface StoreState {
  customers: Customer[];
  auth: User | null;
  createUpdateCustomer: CreateCustomerStepsModel;
}

export const reducers = combineReducers<StoreState>({
  auth: authReducer,
  customers: customersReducer,
  createUpdateCustomer: createUpdateCustomersReducer,
});
