import type { NodeType } from "./types";

export class TreeNode {
  public id: string | undefined;
  public type: NodeType;
  public left: TreeNode | null;
  public right: TreeNode | null;
  public value: string;
  constructor(type: NodeType, value: string, id?: string | undefined) {
    this.type = type;
    this.value = value;
    this.left = null;
    this.right = null;
    this.id = id ?? undefined;
  }

  public toString(): string {
    if (!this.left && !this.right) return this.value;
    return `(${this.left?.toString() ?? ""} ${this.value} ${this.right?.toString() ?? ""})`;
  }
}

export const defaultLogSymbols = ["!", "^", "v", "=>", "<=>"];
export const defaultSymbols = [
  "In",
  "=",
  "<",
  "<=",
  "+",
  "#",
  "*",
  ".",
  ":",
  "/",
  "-",
  "^-1",
  "Uni",
  "Int",
  "Dif",
  "Sub",
  "Suq",
];
