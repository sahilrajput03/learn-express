// @ts-nocheck
import readline from "node:readline";

// * Learn: Using `rl.setPrompt` instead of `rl.question` offers reliable
//        implementation of prefill text.
// src: https://chatgpt.com/c/69ab6c83-42c4-8322-9413-458b8562a99f
async function ask(questionText, prefillText) {
    await new Promise(res => setTimeout(res, 20));

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise((resolve) => {
        rl.setPrompt(questionText);
        rl.prompt();
        if (prefillText) {
            // cursor ends up at the end automatically
            rl.write(prefillText);
        }
        rl.on("line", (line) => {
            rl.close();
            resolve(line);
        });
    });
}

const answer = await ask("▶️ Where are you? ", "Chandigarh");
console.log("🚀 ~ answer?", answer, answer.length);