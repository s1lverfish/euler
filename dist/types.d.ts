export type NodeType = "element" | "symbol" | "logSymbol" | "variable";
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
    inTrees: {
        goalTree: any;
        checkId: string;
    }[];
};
