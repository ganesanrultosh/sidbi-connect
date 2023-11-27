import Segment from "./segment"

interface Page {
  id: number | undefined | null,
  segments: Segment[] | undefined | null
}

export default Page;