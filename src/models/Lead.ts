import { Child } from "./baseModels";
import Moment from 'moment';

export interface Lead extends Child {
  entityName?: string;
  pan?: string;
  loanAmount?: number;
  loanType?: string;
  customerType?: string;
  itrFiling?: string;
  bankStatement?: string;
  gstRegime?: string;
  mobileNo?: string;
  email?: string;
  officeAddress?: string;
  city?: string;
  state?: string;
  pinCode?: number;
  dateOfIncorp?: string;
  applicationFillingBy?: string;
  branchName?: string;
  customerConcent?: string;
  otp?: string;
  dateCreated?: string;
  proposalStatus?: string;
}

export const leadDefaultValue = {
  dateCreated: Moment(new Date()).format("YYYY-MM-DD")
 }