import Field from "./field"

interface Group {
  id: number,
  fieldId: number,
  groupTitle: string
  groupFields: Field []
}

export default Group;