import { Customer } from './customer';

enum ActionTypes {
  FETCH_CUSTOMERS = '@challenge/crm/customers/FETCH_CUSTOMERS',
  CREATE_CUSTOMER = '@challenge/crm/customers/CREATE_CUSTOMER',
}

export interface FetchCustomersAction {
  type: ActionTypes.FETCH_CUSTOMERS;
  payload: Customer[];
}

interface CreateCustomerAction {
  type: ActionTypes.CREATE_CUSTOMER;
  payload: Customer;
}

type CustomersAction = FetchCustomersAction | CreateCustomerAction;

export default function reducer(
  state: Customer[] = [],
  action: CustomersAction
) {
  switch (action.type) {
    case ActionTypes.FETCH_CUSTOMERS:
      return action.payload;

    case ActionTypes.CREATE_CUSTOMER:
      return [...state, action.payload];

    default:
      return state;
  }
}

export const fetchCustomers = (customers: Customer[]) => {
  return {
    type: ActionTypes.FETCH_CUSTOMERS,
    payload: customers,
  };
};

export const createCustomer = (customer: Customer) => {
  return {
    type: ActionTypes.CREATE_CUSTOMER,
    payload: customer,
  };
};
