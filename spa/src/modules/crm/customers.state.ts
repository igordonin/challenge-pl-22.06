import { Customer } from './customer';
import { customersMock } from './customers.mock';
import { CreateCustomerStepsModel } from './customers.types';

enum ActionTypes {
  FETCH_CUSTOMERS = '@challenge/crm/customers/FETCH_CUSTOMERS',
  SAVE_CREATE_CUSTOMER_STEP = '@challenge/crm/customers/SAVE_CREATE_CUSTOMER_STEP',
}

export interface CustomersAction {
  type: ActionTypes;
  payload: Customer[];
}

export default function reducer(
  state: Customer[] = [],
  action: CustomersAction
) {
  switch (action.type) {
    case ActionTypes.FETCH_CUSTOMERS:
      return action.payload;

    case ActionTypes.SAVE_CREATE_CUSTOMER_STEP:
      return action.payload;

    default:
      return state;
  }
}

// TODO: Refatorar depois de conectar com a API
export const fetchCustomers = () => {
  return {
    type: ActionTypes.FETCH_CUSTOMERS,
    payload: customersMock,
  };
};

export const saveCreateCustomerStep = (model: CreateCustomerStepsModel) => {
  return {
    type: ActionTypes.SAVE_CREATE_CUSTOMER_STEP,
    payload: model,
  };
};
