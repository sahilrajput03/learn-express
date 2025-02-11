export async function waitSync(checkFunction, interval = 50, timeout = 5_000) {
    return new Promise<void>((resolve, reject) => {
        const startTime = Date.now();

        const checkInterval = setInterval(() => {
            // Check if the condition is met
            if (checkFunction()) {
                clearInterval(checkInterval); // Stop checking
                resolve(); // Resolve the promise
            }

            // Check for timeout
            if (Date.now() - startTime > timeout) {
                clearInterval(checkInterval); // Stop checking
                reject(new Error('Timeout waiting for condition to be met'));
            }
        }, interval);
    });
}