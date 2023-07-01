import { Address } from "./CompanyModel";

export interface ProfileModel {
    address: Address;
    email: string;
    firstName: string;
    lastName: string;
    maxJobDistance: number;
    phoneNumber: string;
    workerId: string;
}