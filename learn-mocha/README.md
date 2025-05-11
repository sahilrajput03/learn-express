# Learn Mocha

❤️ Documentation: [mochajs.org](https://mochajs.org)

**Learn Mocha - Google Doc:** [Click here](https://docs.google.com/document/d/19lJnR9d93wplsKpdd7pfqqXUgKTWL2HZNYyo64mkFSE/edit?tab=t.0)

**Quick Links:**
- Clear terminal logs before running tests:
  - Use `-R min` (alias for `--reporter min`) - [src](https://mochajs.org/#min)
    - _Also (Hack): You can use this in your test to clear terminal logs before each run as well - `beforeEach(function () { console.log('\x1Bc'); });` [TESTED]_
