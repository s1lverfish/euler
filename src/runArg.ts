import {
  readJson,
  getSchemeObject,
  parseTree,
  getJudgementObject,
  chainPremises,
  weakMatch,
  generateConclusion,
  writeJson,
} from "./utils.js";
import { TreeNode } from "./TreeNode.js";
import type { Arg } from "./types";
import * as fs from "fs";
import * as path from "path";

const runArg = (argId: string) => {
  console.log(`Preparing to run ${argId} ...`);
  const args = readJson("../arguments.json");

  if (!Object.hasOwn(args, argId)) {
    throw new Error(`arg ${argId} not found`);
  }

  const arg = args[argId] as Arg;
  console.log("argument to execute: ", arg); //argument to execute

  const scheme = getSchemeObject(arg.scheme);

  if (!scheme) {
    throw new Error(`scheme ${arg.scheme} not found`);
  }

  const inTree = parseTree(scheme.inTree);
  const outTree = parseTree(scheme.outTree);

  const notYetPremises = arg.inTrees.map((premiseData) => {
    const checkTree = getJudgementObject(premiseData.checkId);

    if (!checkTree) {
      throw new Error(`judgement ${premiseData.checkId} not found`);
    }

    return {
      goalTree: parseTree(premiseData.goalTree),
      checkTree: parseTree(checkTree),
    };
  });

  notYetPremises.forEach((el) => {
    const mp = new Map<string, TreeNode>();
    if (!weakMatch(mp, el.checkTree, el.goalTree)) {
      // el.checkTree is the judgement, el.goalTree is the premise we gave, of which we dont yet know if its a judgement
      throw new Error(
        `${el.goalTree.toString()} cannot be matched to ${el.checkTree.toString()}`,
      );
      // console.log("one of the premises is fucked, namely:", );
      // console.log(el[0].toString());
    }
  });

  const premises = notYetPremises.map((premiseData) => premiseData.goalTree);

  const unifiedPremise = new TreeNode("logSymbol", "^");
  chainPremises(unifiedPremise, premises[0], premises.slice(1)); //this is probably

  const mp = new Map<string, TreeNode>();
  if (weakMatch(mp, inTree, unifiedPremise)) {
    console.log("match!!!!");
    const conclusion = generateConclusion(mp, outTree);

    if (!conclusion) {
      throw new Error("conclusion is null");
    }

    const conclusions = readJson("../conclusions.json") as any[];

    if (conclusions.length === 0) {
      conclusion.id = "C0";
    } else {
      conclusion.id = `C${parseInt((conclusions.at(-1).id as string).slice(1), 10) + 1}`;
    }
    conclusions.push(conclusion);
    writeJson("../conclusions.json", JSON.stringify(conclusions));
    fs.appendFileSync(
      path.join(import.meta.dirname, "../conclusionsHumanReadable"),
      conclusions.at(-1).id + "\n",
    );
    fs.appendFileSync(
      path.join(import.meta.dirname, "../conclusionsHumanReadable"),
      "Scheme: " + inTree.toString() + "\n",
    );
    premises.forEach((el, idx) =>
      fs.appendFileSync(
        path.join(import.meta.dirname, "../conclusionsHumanReadable"),
        idx.toString() + ": " + el.toString() + "\n",
      ),
    );
    fs.appendFileSync(
      path.join(import.meta.dirname, "../conclusionsHumanReadable"),
      "C: " + conclusion.toString() + "\n\n",
    );

    console.log(inTree.toString());
    premises.forEach((el) => console.log(el.toString()));
    console.log(conclusion.toString());
  } else {
    console.log("scheme inTree does not match unifiedPremise");
  }
};

export default runArg;
