// my-reporter.js

'use strict';
const {  logger } = require('./conf/base.conf');
const Mocha = require('mocha');
const {
  EVENT_RUN_BEGIN,
  EVENT_RUN_END,
  EVENT_TEST_FAIL,
  EVENT_TEST_PASS,
  EVENT_SUITE_BEGIN,
  EVENT_SUITE_END
} = Mocha.Runner.constants;

// this reporter outputs test results, indenting two spaces per suite
class MyReporter {
  constructor(runner) {
    this._indents = 0;
    const stats = runner.stats;

    runner
      .once(EVENT_RUN_BEGIN, () => {
        logger.info('Starting INVRS-Tests');
      })
      .on(EVENT_SUITE_BEGIN, () => {
        this.increaseIndent();
      })
      .on(EVENT_SUITE_END, () => {
        this.decreaseIndent();
      })
      .on(EVENT_TEST_PASS, test => {
        // Test#fullTitle() returns the suite name(s)
        // prepended to the test title
        logger.info(`${this.indent()}pass: ${test.title}`);
      })
      .on(EVENT_TEST_FAIL, (test, err) => {
        console.log(
          `${this.indent()}fail: ${test.title} - error: ${err.message}`
        );
      })
      .once(EVENT_RUN_END, () => {
        logger.info(`end: ${stats.passes}/${stats.passes + stats.failures} ok`);
      });
  }

  indent() {
    return Array(this._indents).join('  ');
  }

  increaseIndent() {
    this._indents++;
  }

  decreaseIndent() {
    this._indents--;
  }
}

module.exports = MyReporter;