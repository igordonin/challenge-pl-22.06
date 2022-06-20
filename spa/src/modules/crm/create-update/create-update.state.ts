import {
  CompanyInfoModel,
  CreateCustomerStepsModel,
  KpisModel,
  PersonalInfoModel,
} from './create-update.types';

enum ActionTypes {
  SAVE_PERSONAL_INFO = '@challenge/crm/customers/create-update/SAVE_PERSONAL_INFO',
  SAVE_COMPANY_INFO = '@challenge/crm/customers/create-update/SAVE_COMPANY_INFO',
  SAVE_KPIS_INFO = '@challenge/crm/customers/create-update/SAVE_KPIS_INFO',
}

interface SavePersonalInfoAction {
  type: ActionTypes.SAVE_PERSONAL_INFO;
  payload: PersonalInfoModel;
}

interface SaveCompanyInfoAction {
  type: ActionTypes.SAVE_COMPANY_INFO;
  payload: CompanyInfoModel;
}

interface SaveKpisInfoAction {
  type: ActionTypes.SAVE_KPIS_INFO;
  payload: KpisModel;
}

type SaveCreateCustomerStep =
  | SavePersonalInfoAction
  | SaveCompanyInfoAction
  | SaveKpisInfoAction;

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

    case ActionTypes.SAVE_KPIS_INFO:
      return {
        ...state,
        kpis: action.payload,
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

export const saveKpisStep = (model: KpisModel) => {
  return {
    type: ActionTypes.SAVE_KPIS_INFO,
    payload: model,
  };
};
