const {
  NUMBER,
  STRING,
  VARIABLE,
  EMPTY,
  RESERVED,
} = require('./types');

const {
  generateError,
  INVALID_CHARACTER,
} = require('./error');

const regExs = [
  { regEx: /^[+=*/%)(^-]/, type: RESERVED },
  { regEx: /^'([^']*)'/, type: STRING },
  { regEx: /^[0-9]+/, type: NUMBER },
  { regEx: /^[ \n\t]/, type: EMPTY },
  { regEx: /^[a-zA-Z][a-zA-Z0-9]*/, type: VARIABLE },
];

const findRegExObj = str => regExs.find(x => str.match(x.regEx));

function parseLexem(str) {
  if (!str) {
    return null;
  }
  const regExObj = findRegExObj(str);
  if (!regExObj) {
    throw generateError({
      type: INVALID_CHARACTER,
      payload: str,
    });
  }
  const {
    regEx,
    type,
  } = regExObj;
  const match = str.match(regEx);
  const rawText = match[0];
  const content = match[match.length - 1];
  const token = {
    content,
    type,
  };
  return {
    token,
    rawText,
  };
}

module.exports = {
  parseLexem,
  findRegExObj,
  regExs,
};
