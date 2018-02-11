const INVALID_CHARACTER = 'INVALID_CHARACTER';
const PARSE_ERROR = 'PARSE_ERROR';

const handler = ({ type, payload }) => {
  const cases = {
    [INVALID_CHARACTER]: () => ({ type, payload }),
    [PARSE_ERROR]: () => ({ type: PARSE_ERROR, payload }),
  };
  return (cases[type] || cases.default)();
};

const generateError = (details) => {
  const generatedDetails = handler(details);
  return Object.assign(new Error(), generatedDetails);
};

module.exports = {
  handler,
  generateError,
  INVALID_CHARACTER,
  PARSE_ERROR,
};
