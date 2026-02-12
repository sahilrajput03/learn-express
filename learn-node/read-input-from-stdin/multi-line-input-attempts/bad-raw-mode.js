// !
// !
// ! * Using raw mode.
// !
// ! This is bad approach because I'm not able to use backspace to
//      delete characters while typing input.
//      ! I tried to improve this solution to fix the
//              backspace character to delete characters but fixing
//              that makes clipboard copy/paste functionality to go
//              crap.

async function ask(questionText) {
    console.log(questionText);
    console.log('(Paste code, press Enter twice to finish)');

    return new Promise((resolve) => {
        let buffer = '';
        let lastWasNewline = false;

        process.stdin.setRawMode(true);
        process.stdin.resume();
        process.stdin.setEncoding('utf8');

        process.stdin.on('data', (key) => {
            // Ctrl+C to exit
            if (key === '\u0003') {
                process.exit();
            }

            // Check for double newline
            if (key === '\r' || key === '\n') {
                if (lastWasNewline) {
                    process.stdin.setRawMode(false);
                    process.stdin.pause();
                    resolve(buffer.trim());
                    return;
                }
                buffer += '\n';
                process.stdout.write('\n');
                lastWasNewline = true;
            } else {
                buffer += key;
                process.stdout.write(key);
                lastWasNewline = false;
            }
        });
    });
}

async function main() {
    const answer = await ask('▶️ Working on anything exciting these days? ');
    console.log("🚀 ~ answer?", answer.length, '\n', answer);
}
main();

