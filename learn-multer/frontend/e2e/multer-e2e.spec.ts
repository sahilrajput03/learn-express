import { test, expect } from '@playwright/test';
import path from 'path';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { sleep } from '../src/utils/sleep'

const __dirname = dirname(fileURLToPath(import.meta.url));
const file1 = path.join(__dirname, '..', '..', 'backend', '__tests__', 'sample-files', 'img1.jpg');
const file2 = path.join(__dirname, '..', '..', 'backend', '__tests__', 'sample-files', 'img2.jpg');
const file3 = path.join(__dirname, '..', '..', 'backend', '__tests__', 'sample-files', 'img3.jpg');

test('single image upload', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await sleep(500) // Note: This is necessary otherwise files selected in the file-input is not recognizing the files.
    await page.locator('#single-file-input').setInputFiles(file1);
    await page.getByRole('button', { name: 'Submit single image' }).click();

    // Asserting this alert is doable but its very inconsistant (flaky tests experience).
    // await new Promise<void>(resolve => {
    //     page.on('dialog', async dialog => {
    //         expect(dialog.message()).toEqual("single file upload successful");
    //         await dialog.accept();
    //         resolve();
    //     });
    // });
    await expect(page.getByText('Single file upload successful')).toBeVisible();
});

test('multiple images upload', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await sleep(500) // Note: This is necessary otherwise files selected in the file-input is not recognizing the files.
    await page.locator('#multiple-file-input').setInputFiles([file1, file2]);
    await page.getByRole('button', { name: 'Submit multiple images' }).click();
    await expect(page.getByText('Multiple file upload successful')).toBeVisible();
});