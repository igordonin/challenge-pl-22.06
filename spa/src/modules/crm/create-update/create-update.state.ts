import {
  CompanyInfoModel,
  CreateCustomerStepsModel,
  PersonalInfoModel,
} from './customers.types';

enum ActionTypes {
  SAVE_PERSONAL_INFO = '@challenge/crm/customers/create-update/SAVE_PERSONAL_INFO',
  SAVE_COMPANY_INFO = '@challenge/crm/customers/create-update/SAVE_COMPANY_INFO',
}

export interface SavePersonalInfoAction {
  type: ActionTypes.SAVE_PERSONAL_INFO;
  payload: PersonalInfoModel;
}

export interface SaveCompanyInfoAction {
  type: ActionTypes.SAVE_COMPANY_INFO;
  payload: CompanyInfoModel;
}

type SaveCreateCustomerStep = SavePersonalInfoAction | SaveCompanyInfoAction;

const initialState: CreateCustomerStepsModel = {
  personalInfo: {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    jobTitle: '',
    lastContactUtcDate: null,
  },
  companyInfo: {
    companyName: '',
    companyCountry: '',
    companyWebsite: '',
  },
  kpis: {
    netPromoterScore: 0,
    customerSatisfactionScore: 0,
    customerEffortScore: 0,
    leadScore: 0,
  },
};

export default function reducer(
  state: CreateCustomerStepsModel = initialState,
  action: SaveCreateCustomerStep
): CreateCustomerStepsModel {
  switch (action.type) {
    case ActionTypes.SAVE_PERSONAL_INFO:
      return {
        ...state,
        personalInfo: action.payload,
      };

    case ActionTypes.SAVE_COMPANY_INFO:
      return {
        ...state,
        companyInfo: action.payload,
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

export const saveCompanyInfoStep = (model: CompanyInfoModel) => {
  return {
    type: ActionTypes.SAVE_COMPANY_INFO,
    payload: model,
  };
};
