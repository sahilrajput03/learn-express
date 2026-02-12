import readline from 'readline/promises';

// @ts-ignore
async function ask(questionText) {
    // Learn: Why sleep? Because without it if I put a console log before asking any question then the question appears on same line as of the previous log.
    await new Promise(res => setTimeout(res, 20)); // This sleep is necessary 

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    const result = await rl.question(questionText);
    rl.close();
    return result;
}

const answer = await ask('▶️ Where are you? ');
console.log("🚀 ~ answer?", answer.length);
