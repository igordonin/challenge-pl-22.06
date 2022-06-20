import { CreateCustomerStepsModel } from './customers.types';

enum ActionTypes {
  SAVE_CREATE_CUSTOMER_STEP = '@challenge/crm/customers/create-update/SAVE_CREATE_CUSTOMER_STEP',
}

export interface CreateUpdateCustomerAction {
  type: ActionTypes;
  payload: CreateCustomerStepsModel;
}

export default function reducer(
  state: CreateCustomerStepsModel,
  action: CreateUpdateCustomerAction
) {
  switch (action.type) {
    case ActionTypes.SAVE_CREATE_CUSTOMER_STEP:
      return action.payload;

    default:
      return state;
  }
}

export const saveCreateCustomerStep = (model: CreateCustomerStepsModel) => {
  return {
    type: ActionTypes.SAVE_CREATE_CUSTOMER_STEP,
    payload: model,
  };
};
