import Customer from "./customer";
import Report from "./reportStructure/report";

interface Visit {
  customer: Customer;
  report: Report;
  status: 'created' | 'submitted' | 'synced'
  dateCreated: string | undefined
}

export default Visit;