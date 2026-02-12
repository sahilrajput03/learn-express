import readline from 'readline/promises';

// This solution works but I'm not preferring this solution because:
//  1. Editing the current line is possible but editing
//      the previous line is not possible.
//  2. I need to press `Enter ctrl+d` for every user input
//      which seems too much me for very simple inputs.

async function ask(questionText) {
    await new Promise(res => setTimeout(res, 20));

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    console.log(questionText);
    console.log('(Paste your code, then press Ctrl+D on a new line to finish)');

    const lines = [];

    return new Promise((resolve) => {
        rl.on('line', (line) => {
            lines.push(line);
        });

        // Learn: This is fired when ctrl+d is pressed after an empty line character.
        //          Also, ctrl+d is the standard (Git, psql, Python REPL all use it)
        rl.on('close', () => {
            resolve(lines.join('\n'));
        });
    });
}

async function main() {
    const answer = await ask('▶️ Working on anything exciting these days? ');
    console.log("🚀 ~ answer?", answer.length, '\n', answer);
}
main();

