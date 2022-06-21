import { Customer } from '../customer';
import {
  CompanyInfoModel,
  CreateCustomerStepsModel,
  KpisModel,
  PersonalInfoModel,
} from './create-update.types';

enum ActionTypes {
  RESET_STEPS = '@challenge/crm/customers/create-update/RESET_STEPS',
  LOAD_CUSTOMER_UPDATE = '@challenge/crm/customers/create-update/LOAD_CUSTOMER_UPDATE',
  SAVE_PERSONAL_INFO = '@challenge/crm/customers/create-update/SAVE_PERSONAL_INFO',
  SAVE_COMPANY_INFO = '@challenge/crm/customers/create-update/SAVE_COMPANY_INFO',
  SAVE_KPIS_INFO = '@challenge/crm/customers/create-update/SAVE_KPIS_INFO',
}

interface ResetStepsAction {
  type: ActionTypes.RESET_STEPS;
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

interface LoadCustomerUpdateStep {
  type: ActionTypes.LOAD_CUSTOMER_UPDATE;
  payload: Customer;
}

type SaveCreateCustomerStep =
  | ResetStepsAction
  | LoadCustomerUpdateStep
  | SavePersonalInfoAction
  | SaveCompanyInfoAction
  | SaveKpisInfoAction;

const initialState: CreateCustomerStepsModel = {
  _id: null,
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

    case ActionTypes.RESET_STEPS:
      return initialState;

    case ActionTypes.LOAD_CUSTOMER_UPDATE:
      return {
        _id: action.payload._id,
        personalInfo: {
          firstName: action.payload.fullName.split(' ')[0],
          lastName: action.payload.fullName.split(' ').splice(1).join(' '),
          phoneNumber: action.payload.phoneNumber,
          email: action.payload.email,
          jobTitle: action.payload.jobTitle,
          lastContactUtcDate: action.payload.lastContactUtcDate,
        },
        companyInfo: { ...action.payload.company },
        kpis: { ...action.payload.kpis },
      };

    default:
      return state;
  }
}

export const resetSteps = () => {
  return {
    type: ActionTypes.RESET_STEPS,
  };
};

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

export const loadCustomerUpdateSteps = (customer: Customer) => {
  return {
    type: ActionTypes.LOAD_CUSTOMER_UPDATE,
    payload: customer,
  };
};
