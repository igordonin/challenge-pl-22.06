interface Company {
  companyName?: string;
  companyCountry?: string;
  companyWebsite?: string;
}

interface Kpis {
  netPromoterScore?: number;
  customerSatisfactionScore?: number;
  customerEffortScore?: number;
  leadScore?: number;
}

export interface Customer {
  _id: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  jobTitle: string;
  lastContactUtcDate: string;
  company?: Company;
  kpis?: Kpis;
}
