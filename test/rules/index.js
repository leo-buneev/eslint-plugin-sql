import {
  RuleTester,
} from 'eslint';
import _ from 'lodash';
import plugin from '../../src';

const ruleTester = new RuleTester();

const reportingRules = [
  'format',
  'no-unsafe-query',
];

const parser = require.resolve('@babel/eslint-parser');

for (const ruleName of reportingRules) {
  // eslint-disable-next-line import/no-dynamic-require
  const assertions = require('./assertions/' + _.camelCase(ruleName));

  assertions.invalid = _.map(assertions.invalid, (assertion) => {
    assertion.parser = parser;

    return assertion;
  });

  assertions.valid = _.map(assertions.valid, (assertion) => {
    assertion.parser = parser;

    return assertion;
  });

  ruleTester.run(ruleName, plugin.rules[ruleName], assertions);
}
