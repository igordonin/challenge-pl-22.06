import { Customer } from './customer';
import { customersMock } from './customers.mock';

enum ActionTypes {
  FETCH_CUSTOMERS = '@challenge/crm/customers/FETCH_CUSTOMERS',
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
