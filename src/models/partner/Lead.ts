import { Child } from "./baseModels";
import Moment from 'moment';

export interface Lead extends Child {
  entityName?: string;
  pan?: string;
  loanAmount?: number;
  loanType?: string;
  customerType?: string;
  itrFilingLocal?: boolean;
  bankStatementLocal?: boolean;
  gstRegimeLocal?: boolean;
  itrFiling?: string;
  bankStatement?: string;
  gstRegime?: string;
  mobileNo?: string;
  emailId?: string;
  officeAddress?: string;
  city?: string;
  state?: string;
  pincode?: number;
  // dateOfIncorp?: string;
  applicationFillingBy?: string;
  branchName?: string;
  customerConcent?: string;
  otp?: string;
  dateCreated?: string;
  leadStatus?: string;
}

export const leadDefaultValue : Lead = {
  dateCreated: String(Moment(new Date()).format("YYYY-MM-DD"))
 }