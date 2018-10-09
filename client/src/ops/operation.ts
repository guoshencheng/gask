export interface Operation {
  type: number
  equal(op: Operation): boolean;
}