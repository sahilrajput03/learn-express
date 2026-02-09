const readline = require("node:readline/promises");

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

const main = async () => {
    try {
        const firstName = await ask("Enter your first name: ");
        console.log(`✅ Hello, ${firstName.toUpperCase()}`);

        const lastName = await ask("Enter your last name: ");
        console.log(`✅ Your last name is: ${lastName.toUpperCase()}`);
        console.log("Bye ❤️.");
    } catch (error) {
        console.log('Error?', error);
    }
};
main();