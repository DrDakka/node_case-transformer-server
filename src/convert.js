const en = require('./enums');

const isLetter = (letter) => letter.toUpperCase() !== letter.toLowerCase();
const isSeparator = (sym) => /[ _-]/.test(sym);

const lcTransform = (text, sep) => {
  let res = '';

  for (const ch of text) {
    if (isLetter(ch)) {
      res += ch.toLowerCase();

      continue;
    }

    if (isSeparator(ch)) {
      res += sep;

      continue;
    }

    res += ch;
  }

  return res;
};

const camelLike = (text, firstUpper) => {
  let res = '';
  let makeUpper = firstUpper;

  for (const ch of text) {
    if (isSeparator(ch)) {
      makeUpper = true;
      continue;
    }

    if (isLetter(ch)) {
      if (makeUpper) {
        res += ch.toUpperCase();
        makeUpper = false;
      } else {
        res += ch.toLowerCase();
      }
      continue;
    }

    res += ch;
    makeUpper = false;
  }

  return res;
};

const ucTransform = (text) => {
  const pre = lcTransform(text, '_');

  return pre.toUpperCase();
};

const convert = {
  [en.casesEn.SNAKE]: (text) => lcTransform(text, '_'),
  [en.casesEn.KEBAB]: (text) => lcTransform(text, '-'),
  [en.casesEn.CAMEL]: (text) => camelLike(text, false),
  [en.casesEn.PASCAL]: (text) => camelLike(text, true),
  [en.casesEn.UPPER]: (text) => ucTransform(text),
};

module.exports = { convert };
