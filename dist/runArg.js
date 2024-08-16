import { readJson, getSchemeObject, parseTree, getJudgementObject, chainPremises, weakMatch, generateConclusion, } from "./utils.js";
import { TreeNode } from "./TreeNode.js";
const runArg = (argId) => {
    console.log(`Preparing to run ${argId} ...`);
    const args = readJson("../arguments.json");
    if (!Object.hasOwn(args, argId)) {
        throw new Error(`arg ${argId} not found`);
    }
    const arg = args[argId];
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
        const mp = new Map();
        if (!weakMatch(mp, el.checkTree, el.goalTree)) {
            // el.checkTree is the judgement, el.goalTree is the premise we gave, of which we dont yet know if its a judgement
            throw new Error(`${el.goalTree.toString()} cannot be matched to ${el.checkTree.toString()}`);
            // console.log("one of the premises is fucked, namely:", );
            // console.log(el[0].toString());
        }
    });
    const premises = notYetPremises.map((premiseData) => premiseData.goalTree);
    const unifiedPremise = new TreeNode("proposition", "^");
    chainPremises(unifiedPremise, premises[0], premises.slice(1)); //this is probably
    const mp = new Map();
    if (weakMatch(mp, inTree, unifiedPremise)) {
        console.log("match!!!!");
        console.log(inTree.toString());
        premises.forEach((el) => console.log(el.toString()));
        const conclusion = generateConclusion(mp, outTree);
        console.log("conclusion: ", conclusion?.toString());
        // console.log(conclusion);
    }
    else {
        console.log("scheme inTree does not match unifiedPremise");
    }
};
export default runArg;
