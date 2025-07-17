const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
});

const questionText = 'Enter your name: ';
const read = () => new Promise((resolve) => readline.question(questionText, resolve));

const main = async () => {
    const textFromStdin = await read();
    readline.close(); // This is not redundant!

    console.log('\nHello, ', textFromStdin);
    console.log("Nice to meet you ❤️.");
};
main();