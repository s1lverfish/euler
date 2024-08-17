import { readJson } from "./utils.js";
import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import runArg from "./runArg.js";
import propWizard from "./propWizard.js";
const rl = readline.createInterface({ input, output });
while (true) {
    const command = await rl.question("What should I do? (arg/axiom) : ");
    if (command === "axiom") {
        const axioms = readJson("../axioms.json");
        let axiomid;
        if (axioms.length === 0) {
            axiomid = "A0";
        }
        else {
            axiomid = `A${parseInt(axioms.at(-1).id.slice(1), 10) + 1}`;
        }
        await propWizard(rl, axiomid);
    }
    else if (command === "arg") {
        const argId = await rl.question("Which arg should I run? (argId): ");
        try {
            runArg(argId);
        }
        catch (e) {
            console.error(e);
        }
    }
    else {
        console.log(`Please input one of the following: axiom, arg`);
    }
}
