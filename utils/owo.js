const { MAX_TWEET_LENGTH } = process.env;
const $ = require("arrayfriend");

const addFaces = (str) => {
  const faceOptions = $("D:", ">.<", ":P", "XD", ":3");

  const count = (str.match(/. /g) || []).length;

  for (let i = 0; i < count; i++) {
    if (Math.random() > 0.5) {
      str = str.replace(". ", ` ${faceOptions.random()} `);
    }
  }

  return str;
};

const prefix = (str) => {
  const prefixes = $("*nuzzles*", "*nuzzles and kisses you*", "*softly*");
  return Math.random() > 0.5 ? `${prefixes.random()} ${str}` : str;
};

const owoConvert = (str) => {
  let owo = str
    .replace(/r/g, "w")
    .replace(/l/g, "w")
    .replace(/R/g, "W")
    .replace(/L/g, "W");

  const extraCringe = prefix(addFaces(owo));

  return extraCringe > parseInt(MAX_TWEET_LENGTH) ? owo : extraCringe;
};

module.exports = owoConvert;
