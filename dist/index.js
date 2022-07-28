"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _format = _interopRequireDefault(require("./rules/format"));

var _noUnsafeQuery = _interopRequireDefault(require("./rules/noUnsafeQuery"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const rules = {
  format: _format.default,
  'no-unsafe-query': _noUnsafeQuery.default
};
var _default = {
  rules,
  rulesConfig: {
    format: 0,
    'no-unsafe-query': 0
  }
};
exports.default = _default;
module.exports = exports.default;