import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import runArg from "./runArg.js";

const rl = readline.createInterface({ input, output });

while (true) {
  const command = await rl.question("What should I do? (arg) : ");

  if (command === "axiom") {
  } else if (command === "arg") {
    const argId = await rl.question("Which arg should I run? (argId): ");
    try {
      runArg(argId);
    } catch (e) {
      console.error(e);
    }
  } else {
    console.log(`Please input one of the following: axiom, arg`);
  }
}
