import * as readline from "node:readline/promises";
import { TreeNode } from "./TreeNode.js";
declare const propWizard: (rl: readline.Interface, id: string) => Promise<TreeNode | null>;
export default propWizard;
