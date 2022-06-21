export interface PersonalInfoModel {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  jobTitle: string;
  lastContactUtcDate: string | null | undefined;
}

export interface CompanyInfoModel {
  companyName?: string;
  companyCountry?: string;
  companyWebsite?: string;
}

export interface KpisModel {
  netPromoterScore?: number;
  customerSatisfactionScore?: number;
  customerEffortScore?: number;
  leadScore?: number;
}

export interface CreateCustomerStepsModel {
  _id?: string | null;
  personalInfo: PersonalInfoModel;
  companyInfo: CompanyInfoModel;
  kpis: KpisModel;
}
