import { Child } from "./baseModels";

export interface Lead extends Child {
  name: string | undefined;
  pan: string | undefined;
  loanAmount: number | undefined;
  loanType: string | undefined;
  customerType: string | undefined;
  itrFiling: string | undefined;
  bankStatement: string | undefined;
  gstRegime: string | undefined;
  mobileNo: string | undefined;
  email: string | undefined;
  officeAddress: string | undefined;
  city: string | undefined;
  state: string | undefined;
  pinCode: number | undefined;
  dateOfIncorp: string | undefined;
  applicationFillingBy: string | undefined;
  branchName: string | undefined;
  customerConcent: string | undefined;
  otp: string | undefined;
}