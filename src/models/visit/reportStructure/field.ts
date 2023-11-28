import Group from "./group";

interface Field {
  id: number | undefined | null,
  fieldId: number | undefined | null,
  fieldTitle: string  | undefined | null,
  fieldColumnName: string | undefined | null,
  fieldType: string | undefined | null,
  domainValue: string | undefined | null,
  defaultValue: string | undefined | null,
  placeholder: string | undefined | null,
  fieldValue: string | undefined | null,
  fieldLength: number | undefined | null,
  key: string | undefined | null,
  listofValues: string[] | undefined | null,
  group: Group[]
}

export default Field;