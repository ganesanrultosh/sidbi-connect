interface VisitFieldUpdateContext {
  pan: string,
  reportId: number,
  page: number,
  segment: number,
  fieldIndex: number,
  groupItemIndex: number | undefined,
  groupFieldIndex: number | undefined,
  value: any
}

export default VisitFieldUpdateContext;