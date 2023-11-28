import Customer from "./customer";
import Report from "./reportStructure/report";

interface Visit {
  customer: Customer;
  report: Report;
}

export default Visit;