"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _debug = _interopRequireDefault(require("debug"));

var _isSqlQuery = _interopRequireDefault(require("../utilities/isSqlQuery"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const debug = (0, _debug.default)('eslint-plugin-sql:rule:no-unsafe-query');

var _default = context => {
  const placeholderRule = context.settings.sql && context.settings.sql.placeholderRule;
  const allowLiteral = context.options && context.options[0] && context.options[0].allowLiteral;
  return {
    TemplateLiteral(node) {
      if (allowLiteral && node.quasis.length === 1) {
        return;
      }

      const literal = node.quasis.map(quasi => {
        return quasi.value.raw;
      }).join('foo');
      debug('input', literal);
      const recognizedAsQuery = (0, _isSqlQuery.default)(literal, placeholderRule);
      debug('recognized as a query', recognizedAsQuery);

      if (!recognizedAsQuery) {
        return;
      }

      const {
        tag
      } = node.parent;
      const legacyTagName = tag && tag.name && tag.name.toLowerCase();
      const tagName = tag && tag.property && tag.property.name && tag.property.name.toLowerCase();

      if (legacyTagName !== 'sql' && tagName !== 'sql') {
        context.report({
          message: 'Use "sql" tag',
          node
        });
      }
    }

  };
};

exports.default = _default;
module.exports = exports.default;