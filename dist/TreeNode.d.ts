import type { NodeType } from "./types";
export declare class TreeNode {
    id: string | undefined;
    type: NodeType;
    left: TreeNode | null;
    right: TreeNode | null;
    value: string;
    constructor(type: NodeType, value: string, id?: string | undefined);
    toString(): string;
}
export declare const defaultLogSymbols: string[];
export declare const defaultSymbols: string[];
