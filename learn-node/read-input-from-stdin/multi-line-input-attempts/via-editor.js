import readline from 'readline/promises';

// ❤️ Allows editing with vim/vscode very efficiently with
//      100% editing control.

import { execSync } from 'child_process';
import { mkdtempSync, readFileSync, rmSync, unlinkSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';

// @ts-ignore
async function ask(questionText) {
    console.log(questionText);

    const tempDir = mkdtempSync(join(tmpdir(), 'cli-'));
    console.log("🚀 ~ tempDir?", tempDir);
    const tempFile = join(tempDir, 'input.txt');

    const editor = process.env.EDITOR || 'vim';
    execSync(`${editor} ${tempFile}`, { stdio: 'inherit' });

    const content = readFileSync(tempFile, 'utf8');
    rmSync(tempDir, { recursive: true });

    return content;
}

async function main() {
    const answer = await ask('▶️ Working on anything exciting these days? ');
    console.log("🚀 ~ answer?", answer.length, '\n', answer);
}
main();

// /var/folders/5k/slsrk9d90bg806p4zvyx829m0000gn/T/cli-*