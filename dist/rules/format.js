"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _astring = require("astring");

var _pgFormatter = require("pg-formatter");

var _isSqlQuery = _interopRequireDefault(require("../utilities/isSqlQuery"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const create = context => {
  const placeholderRule = context.settings.sql && context.settings.sql.placeholderRule;
  const pluginOptions = context.options && context.options[0] || {};
  const ignoreExpressions = pluginOptions.ignoreExpressions === true;
  const ignoreInline = pluginOptions.ignoreInline !== false;
  const ignoreTagless = pluginOptions.ignoreTagless !== false;
  return {
    TemplateLiteral(node) {
      const sqlTagIsPresent = node.parent.tag && node.parent.tag.name === 'sql';

      if (ignoreTagless && !sqlTagIsPresent) {
        return;
      }

      if (ignoreExpressions && node.quasis.length !== 1) {
        return;
      }

      const magic = '"gajus-eslint-plugin-sql"';
      const literal = node.quasis.map(quasi => {
        return quasi.value.raw;
      }).join(magic);

      if (!sqlTagIsPresent && !(0, _isSqlQuery.default)(literal, placeholderRule)) {
        return;
      }

      if (ignoreInline && !literal.includes('\n')) {
        return;
      }

      let formatted = (0, _pgFormatter.format)(literal.trim(), context.options[1]);
      formatted = `\n${formatted}`;

      if (formatted !== literal) {
        context.report({
          fix: fixer => {
            let final = formatted;
            const expressionCount = node.expressions.length;
            let index = 0;

            while (index <= expressionCount - 1) {
              final = final.replace(magic, '${' + (0, _astring.generate)(node.expressions[index]) + '}');
              index++;
            }

            return fixer.replaceTextRange([node.quasis[0].range[0], node.quasis[node.quasis.length - 1].range[1]], '`' + final + '`');
          },
          message: 'Format the query',
          node
        });
      }
    }

  };
};

var _default = {
  create,
  meta: {
    docs: {
      description: 'Matches queries in template literals. Warns when query formatting does not match the configured format (see Options).',
      url: 'https://github.com/gajus/eslint-plugin-sql#eslint-plugin-sql-rules-format'
    },
    fixable: 'code',
    schema: [{
      additionalProperties: false,
      properties: {
        ignoreExpressions: {
          default: false,
          type: 'boolean'
        },
        ignoreInline: {
          default: true,
          type: 'boolean'
        },
        ignoreStartWithNewLine: {
          default: true,
          type: 'boolean'
        },
        ignoreTagless: {
          default: true,
          type: 'boolean'
        }
      },
      type: 'object'
    }, {
      additionalProperties: false,
      properties: {
        anonymize: {
          default: false,
          type: 'boolean'
        },
        commaBreak: {
          default: false,
          type: 'boolean'
        },
        noRcFile: {
          default: false,
          type: 'boolean'
        },
        spaces: {
          type: 'number'
        },
        stripComments: {
          default: false,
          type: 'boolean'
        },
        tabs: {
          default: false,
          type: 'boolean'
        }
      },
      type: 'object'
    }],
    type: 'suggestion'
  }
};
exports.default = _default;
module.exports = exports.default;