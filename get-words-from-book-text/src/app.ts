import * as fs from "fs";

async function main() {
  const cleanString = (input: string) => {
    // Use regex to replace all characters except a-z, A-Z, space and new line character (\n) with an empty string
    return input.replace(/[^a-zA-Z \n]/g, '');
  };

  // read file
  const text = fs.readFileSync('./src/input.txt', { encoding: 'utf8' });

  // const originalString = "Hello, World! 123."; // for debugging
  const cleanedString = cleanString(text);

  const allWords = cleanedString
    .split(/\s+/) // Split the string by spaces or new-line characters (\n)
    .filter(str => str.trim() !== '')
    .sort((a, b) => a.localeCompare(b))

  // Normalize case by converting all words to lowercase
  const lowerCaseAllWords = allWords.map(word => word.toLowerCase());

  const uniqueLowerCaseAllWords = [...new Set(lowerCaseAllWords)];

  const commonWords = ['a', 'the', 'too']
  const uncommonWords = uniqueLowerCaseAllWords.filter(word => !commonWords.includes(word))
  // write to file
  await fs.writeFileSync('./src/output.txt', uncommonWords.join('\n'), { encoding: 'utf8' });

}

console.time()
main()
console.timeEnd()
