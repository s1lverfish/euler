export class TreeNode {
    id;
    type;
    left;
    right;
    value;
    constructor(type, value, id) {
        this.type = type;
        this.value = value;
        this.left = null;
        this.right = null;
        this.id = id ?? undefined;
    }
    toString() {
        if (!this.left && !this.right)
            return this.value;
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
