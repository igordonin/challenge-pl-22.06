export interface PersonalInfoModel {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  jobTitle: string;
  lastContactUtcDate: string | null | undefined;
}

export interface CreateCustomerStepsModel {
  personalInfo: PersonalInfoModel;
  companyInfo: {};
  kpis: {};
}
