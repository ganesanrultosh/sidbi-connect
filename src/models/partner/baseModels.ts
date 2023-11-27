export interface RequestWithParentId<T> {
  parentId: number,
  requestValue : T
}

export interface Child {
  id?: number;
  parentId?: number;
}