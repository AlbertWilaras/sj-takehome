export interface Address {
  formattedAddress: string;
  zoneId: string;
}

export interface CompanyModel {
  name: string;
  address: Address;
  reportTo: { name: string; phone?: string };
}
