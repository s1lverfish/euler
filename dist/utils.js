import { TreeNode } from "./TreeNode.js";
import * as fs from "fs";
import * as path from "path";
const isTreeNode = (obj) => {
    return Object.hasOwn(obj, "type") && Object.hasOwn(obj, "value");
};
export const parseTree = (root) => {
    if (!isTreeNode(root)) {
        throw new Error(`error parsing node: id: (${root?.id ?? "NO_ID"})  type: (${root?.type ?? "NO_TYPE"}) value: (${root?.value ?? "NO_VALUE"})`);
    }
    const rootNode = new TreeNode(root.type, root.value, root?.id);
    rootNode.left =
        root?.left === undefined || root?.left === null
            ? null
            : parseTree(root.left);
    rootNode.right =
        root?.right === undefined || root?.right === null
            ? null
            : parseTree(root.right);
    return rootNode;
};
export const chainPremises = (parent, left, rest) => {
    if (rest.length === 1) {
        parent.left = left;
        parent.right = rest[0];
        return;
    }
    parent.left = left;
    parent.right = new TreeNode("logSymbol", "^");
    chainPremises(parent.right, rest[0], rest.slice(1));
};
export const readJson = (relPath) => {
    return JSON.parse(fs.readFileSync(path.join(import.meta.dirname, relPath)).toString());
};
export const writeJson = (relPath, data) => {
    fs.writeFileSync(path.join(import.meta.dirname, relPath), data);
};
export const getSchemeObject = (scheme) => {
    const schemeJson = readJson("../schemes.json");
    return schemeJson.find((el) => el.id === scheme);
};
export const getJudgementObject = (id) => {
    if (id[0] === "A") {
        const axiomJson = readJson("../axioms.json");
        return axiomJson.find((el) => el.id === id);
    }
    else if (id[0] === "C") {
        const conclusionJson = readJson("../conclusions.json");
        return conclusionJson.find((el) => el.id === id);
    }
    throw new Error(`judgement of id ${id} not found`);
};
//t1-re ráfektetjük a t2-őt
export const weakMatch = (mp, t1, t2) => {
    //t1 should be prefix of t2
    if (t1 === null || t2 === null) {
        //true if t1 and t2 is null
        return t1 === t2;
    }
    //t1 has variable
    if (t1.type === "variable") {
        const val = mp.get(t1.value);
        if (val) {
            return strongMatch(val, t2);
        }
        else {
            mp.set(t1.value, t2);
            return true;
        }
    }
    //mismatch during matching
    if (t1.type !== t2.type || t1.value !== t2.value) {
        return false;
    }
    //t1.type === t2.type
    //t1.value === t2.value
    return weakMatch(mp, t1.left, t2.left) && weakMatch(mp, t1.right, t2.right);
};
export const strongMatch = (t1, t2) => {
    if (t1 === null || t2 === null) {
        //true if t1 and t2 is null
        return t1 === t2;
    }
    if (t1.type !== t2.type || t1.value !== t2.value) {
        return false;
    }
    return strongMatch(t1.left, t2.left) && strongMatch(t1.right, t2.right);
};
export const generateConclusion = (mp, scheme) => {
    if (scheme === null) {
        return null;
    }
    if (scheme.type === "variable") {
        const val = mp.get(scheme.value);
        if (!val) {
            throw new Error(`weakMatch passed but ${scheme.value} not in map`);
        }
        return val;
    }
    const node = new TreeNode(scheme.type, scheme.value, scheme?.id);
    node.left = generateConclusion(mp, scheme.left);
    node.right = generateConclusion(mp, scheme.right);
    return node;
};
