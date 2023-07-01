import { CompanyModel } from "./CompanyModel";
import { ShiftModel } from "./ShiftModel";

export interface JobTitle {
  name: string;
  imageUrl: string;
}

export interface JobModel {
  jobId: string;
  jobTitle: JobTitle;
  company: CompanyModel;
  wagePerHourInCents: number;
  milesToTravel: number;
  shifts: ShiftModel[];
  branch: string;
  branchPhoneNumber: string;
  requirements?: string[];
}
