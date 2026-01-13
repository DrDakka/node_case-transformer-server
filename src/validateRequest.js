/* eslint-disable prettier/prettier */
const en = require('./enums');
const dc = require('./detectCase');

function validateRequest(req) {
  const errors = [];
  const reqPhrase = req.pathname.slice(1);

  if (reqPhrase === '') {
    errors.push({ message: en.erEn.NO_TEXT });
  }

  const reqCase = req.searchParams.get('toCase');

  if (!reqCase) {
    errors.push({ message: en.erEn.NO_PARAM });
  } else if (!Object.values(en.casesEn).some((el) => el === reqCase)) {
    errors.push({ message: en.erEn.NOT_SUPPORTED_CASE });
  }

  return errors.length !== 0
    ? { ok: false, data: errors }
    : {
      ok: true,
      data: {
        ...dc.detectCase(reqPhrase),
        targetCase: reqCase,
        originalText: reqPhrase,
      },
    };
}

module.exports = { validateRequest };
