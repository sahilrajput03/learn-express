# README

Clone this folder via -

```bash
npx tiged sahilrajput03/learn-express/console-and-file-log console-and-file-log
```

**📜 Overview**

This Node.js utility captures and logs both stdout and stderr to separate files while also printing them to the terminal. Additionally, it merges both streams into a combined log file for better debugging and tracking.

**🔥 Features**

Logs stdout to stdout.log and stderr to stderr.log.
Prints all console output to the terminal.
Merges both stdout and stderr into stdout_stderr.log.
Uses file streams for efficient logging.
Ensures logs are appended chronologically.

**🚀 Usage**

Simply include this script in your Node.js application, and all console logs and errors will be automatically written to files while remaining visible in the terminal.

## Are the logs appended in chronological manner in log files? (ChatGPT)

Is chronological order better than the reverse-chronology order to debug the logs later? Be concise 

Yes, logs are appended in chronological order, meaning earlier entries appear first. Chronological order is generally better for debugging since it preserves the sequence of events, making it easier to trace the flow and identify when issues occur.