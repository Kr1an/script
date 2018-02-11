const { parseLexem } = require('./regExs');
const {
  generateError,
  PARSE_ERROR,
} = require('./error');

function getTokens(code) {
  const parseLexemResult = parseLexem(code);
  if (!parseLexemResult) {
    return [];
  }
  const {
    token,
    rawText,
  } = parseLexemResult;
  return [token, ...getTokens(code.slice(rawText.length))];
}

function lex(code) {
  try {
    return getTokens(code);
  } catch (e) {
    throw generateError({
      type: PARSE_ERROR,
      payload: {
        position: code.indexOf(e.payload),
        code,
      },
    });
  }
}

module.exports = lex;
