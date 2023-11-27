import Page from "./page";

interface Report {
  id: number | undefined | null,
  reportId: number | undefined | null,
  reportTitle: string | undefined | null,
  pages: Page[] | undefined | null
}

export default Report;