// fix optional params
export interface Customer {
  id: number;
  fullName: string;
  phoneNumber: string;
  email: string;
  jobTitle?: string;
  lastContactUtcDate?: string;
  companyName?: string;
  companyCountry?: string;
  companyWebsite?: string;
  netPromoterScore?: number;
  customerSatisfactionScore?: number;
  customerEffortScore?: number;
  leadScore?: number;
}
