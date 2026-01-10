const readline = require("node:readline/promises");

// @ts-ignore
async function ask(questionText) {
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