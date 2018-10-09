import { Operation } from './operation';

class Operator {
  nickname: string
  email: string
}

export class LogNode {
  operator: Operator
  operation: Operation
  timestamp: string
  hash: string
  next?: LogNode
  pre?: LogNode
  root?: LogNode
  insert(node: LogNode) {
    if (this.pre) {
      const temp = this.pre;
      // 插入node
      temp.next = node;
      this.pre = node;
      // 设置 node的前后
      node.next = this;
      node.pre = temp;
      // root设置
      node.root = this.root;
    } else {
      // 插入到最前
      node.next = this;
      this.pre = node;
      this.root = node;
    }
  }
  add(node: LogNode) {
    if (this.next) {
      const temp = this.next;
      // 插入node
      temp.pre = node;
      this.next = node;
      // 设置 node的前后
      node.next = temp;
      node.pre = this;
      // root设置
      node.root = this.root || this;
    } else {
      // 插入到最后
      this.next = node;
      node.pre = this;
      node.root = this.root || this;
    }
  }
  head(node: LogNode) {
    const root = this.root || this;
    node.next = root;
    root.pre = node;
    root.root = node;
  }
  tail(node: LogNode) {
    // 递归找最后
    if (this.next) {
      this.next.tail(node);
    } else {
      this.add(node);
    }
  }
}