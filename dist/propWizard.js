const propWizard = async (rl, id) => {
    const text = await rl.question(id + " : ");
    console.log(text, " etc");
    const textarr = new Array(); //is this wrong?
    let i = 0;
    console.log(text.split(" ").filter((el) => el !== ""));
    //filling textarr, the elements in textarr are seperted by spaces
    for (let j = 0; j < text.length; j++) {
        if (text[j] != " ") {
            if (textarr[i] === undefined) {
                textarr[i] = "";
            }
            textarr[i] += text[j];
        }
        else if (j > 0) {
            if (text[j] === " " && text[j - 1] != " ") {
                i++;
            }
        }
        else {
            continue;
        }
    }
    console.log(textarr);
    return null;
};
const stringArrayToTree = (textarr) => {
    let level = 0;
    let cursor = 1;
    return null;
};
export default propWizard;
