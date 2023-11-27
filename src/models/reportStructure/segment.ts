import Field from "./field"

interface Segment {
  id: number | undefined | null,
  segmentId: number | undefined | null,
  segmentTitle: string | undefined | null
  fields: Field[] | undefined | null
}

export default Segment;

