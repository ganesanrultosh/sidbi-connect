import Segment from "./segment"

interface Page {
  id: number | undefined | null,
  segments: Segment[]
}

export default Page;