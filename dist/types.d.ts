export type NodeType = "element" | "expression" | "proposition" | "variable";
export type Scheme = {
    id: string;
    inTree: any;
    outTree: any;
};
export type Judgement = {
    id: string;
    type: string;
    left: any;
    right: any;
    value: string;
};
export type Arg = {
    scheme: string;
    inTrees: string[];
};
