import type { Scheme, Judgement } from "./types";
import { TreeNode } from "./TreeNode.js";
export declare const parseTree: (root: any) => TreeNode;
export declare const chainPremises: (parent: TreeNode, left: TreeNode, rest: TreeNode[]) => void;
export declare const readJson: (relPath: string) => any;
export declare const getSchemeObject: (scheme: string) => Scheme | undefined;
export declare const getJudgementObject: (id: string) => Judgement | undefined;
export declare const weakMatch: (mp: Map<string, TreeNode>, t1: TreeNode | null, t2: TreeNode | null) => boolean;
export declare const strongMatch: (t1: TreeNode | null, t2: TreeNode | null) => boolean;
export declare const generateConclusion: (mp: Map<string, TreeNode>, scheme: TreeNode | null) => TreeNode | null;
