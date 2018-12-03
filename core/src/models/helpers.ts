export interface PageOptions {
  pageSize?: number;
  pageNo?: number;
  where?: any
}

export interface ModelOp<M> {
  findById(id: string): Promise<M>
  findAll(options: PageOptions): Promise<M[]>
  findOne(where: any): Promise<M>
  updateById(id: string, task: M): Promise<M>
  create(task: M): Promise<M>
}