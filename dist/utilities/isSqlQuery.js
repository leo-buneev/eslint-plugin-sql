"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sqlParse = _interopRequireDefault(require("sql-parse"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (literal, ignorePattern) => {
  if (!literal) {
    return false;
  }

  let maybeSql = literal;

  if (ignorePattern) {
    maybeSql = maybeSql.replace(new RegExp(ignorePattern, 'ug'), 'foo');
  }

  try {
    _sqlParse.default.parse(maybeSql);
  } catch {
    return false;
  }

  return true;
};

exports.default = _default;
module.exports = exports.default;