import { CreateCustomerStepsModel, PersonalInfoModel } from './customers.types';

enum ActionTypes {
  SAVE_PERSONAL_INFO = '@challenge/crm/customers/create-update/SAVE_PERSONAL_INFO',
}

export interface SavePersonalInfoAction {
  type: ActionTypes.SAVE_PERSONAL_INFO;
  payload: PersonalInfoModel;
}

type SaveCreateCustomerStep = SavePersonalInfoAction;

const initialState = {
  personalInfo: {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    jobTitle: '',
    lastContactUtcDate: null,
  },
  companyInfo: {},
  kpis: {},
};

export default function reducer(
  state: CreateCustomerStepsModel = initialState,
  action: SaveCreateCustomerStep
) {
  switch (action.type) {
    case ActionTypes.SAVE_PERSONAL_INFO:
      return {
        ...state,
        personalInfo: action.payload,
      };

    default:
      return state;
  }
}

export const savePersonalInfoStep = (model: PersonalInfoModel) => {
  return {
    type: ActionTypes.SAVE_PERSONAL_INFO,
    payload: model,
  };
};
