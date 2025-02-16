# README

Clone this folder via -

```sh
npx tiged sahilrajput03/learn-express/console-and-file-log console-and-file-log
cd console-and-file-log
node app.js

# Note: Logs are written to files under `.ignored` directory and we ignore this folder in .gitignore file on purpose because we do not want server instance logs to sync to github repository.
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


## 🚗 Other thoughts

When big cloud companies have built special logs utilities e.g, cloudwatch and logger in github actions they have feature to help hide credentials being printed to screens. THIS IS ALL GOOD *BUT* if developer pushed some code to an api to production `res.json(process.env)` in any random api then developer gets all production environment values at once. HACKED (?). Developer is always in control of everything!

## How much size of .log files are okay to work with in linux server in mb? (ChatGPT)

The acceptable size of .log files on a Linux server depends on several factors, such as available disk space, performance impact, and log rotation policies. Here are some general guidelines:

✅ Recommended .log File Sizes:

1. Small Servers (Low Traffic/Personal Use)

- Size Range: 50MB – 500MB
- Why? Easy to manage, low impact on performance.

2. Medium-Sized Servers (Business Applications, APIs, Small Databases)

- e Range: 500MB – 2GB
- ? Logs might be needed for debugging but should be rotated frequently.

3. Large/Enterprise Servers (High Traffic, Web Apps, Databases, Cloud Services)

- Size Range: 2GB – 5GB (per log file)
- Why? Log management tools like ELK Stack, Splunk, or Grafana help analyze large logs.

🚨 Potential Issues with Large Logs (Above 5GB)

- Disk Space Consumption – Can fill up /var/log or /tmp.
- Slow Processing – Searching, grepping, or opening large files can be slow.
- Backup & Sync Problems – Large files take time to copy or transfer.

📌 Best Practices
- Use Log Rotation (logrotate) – Automatically compresses, rotates, and removes old logs.
- Monitor Disk Usage (df -h & du -sh /var/log) – Prevents unexpected crashes.
- Compress Large Logs (gzip, bzip2) – Saves space.
- Use tail -f Instead of Opening Entire Files – Better for real-time monitoring.
