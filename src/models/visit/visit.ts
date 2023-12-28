import Customer from "./customer";
import Report from "./reportStructure/report";

interface Visit {
  id?: number,
  customer: Customer;
  report: Report;
  status: 'created' | 'submitted' | 'synced' | 'syncfailure'
  error?: string;
  dateCreated: string | undefined
  domainValues: {
    [lkey: string]: {
      status: string,
      values: []
    }
  };
}

export default Visit;