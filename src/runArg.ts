import {
  readJson,
  getSchemeObject,
  parseTree,
  getJudgementObject,
  chainPremises,
  weakMatch,
  generateConclusion,
} from "./utils.js";
import { TreeNode } from "./TreeNode.js";
import type { Arg } from "./types";

const runArg = (argId: string) => {
  console.log(`Preparing to run ${argId} ...`);
  const args = readJson("../arguments.json");
  if (!Object.hasOwn(args, argId)) {
    throw new Error(`arg ${argId} not found`);
  }
  const arg = args[argId] as Arg;
  console.log(arg);
  const scheme = getSchemeObject(arg.scheme);
  if (!scheme) {
    throw new Error(`scheme ${arg.scheme} not found`);
  }
  const inTree = parseTree(scheme.inTree);
  const outTree = parseTree(scheme.outTree);
  const premises = arg.inTrees.map((id) => {
    const premise = getJudgementObject(id);
    if (!premise) {
      throw new Error(`judgement ${id} not found`);
    }
    return parseTree(premise);
  });
  const unifiedPremise = new TreeNode("proposition", "^");
  chainPremises(unifiedPremise, premises[0], premises.slice(1));
  const mp = new Map<string, TreeNode>();
  if (weakMatch(mp, inTree, unifiedPremise)) {
    console.log("match!!!!");
    console.log(inTree.toString());
    premises.forEach((el) => console.log(el.toString()));
    const conclusion = generateConclusion(mp, outTree);
    console.log("conclusion: ", conclusion?.toString());
    // console.log(conclusion);
  } else {
    console.log("scheme inTree does not match unifiedPremise");
  }
};

export default runArg;
