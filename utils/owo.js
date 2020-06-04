const { MAX_TWEET_LENGTH } = process.env;
const $ = require("arrayfriend");
const Entities = require("html-entities").AllHtmlEntities;
const entities = new Entities();

const addFaces = (str) => {
  const faceOptions = $("D:", ">.<", ":P", "XD", ":3");

  const sentenceCount = (str.match(/. /g) || []).length;

  for (let i = 0; i < sentenceCount; i++) {
    // Replace periods in sentences randomly, only 50% of the time
    if (Math.random() > 0.5) {
      str = str.replace(". ", ` ${faceOptions.random()} `);
    }
  }

  return str;
};

const prefix = (str) => {
  const prefixes = $(
    "*nuzzles*",
    "*nuzzles and kisses you*",
    "*whispers softly*",
    "*blushes*"
  );
  return Math.random() > 0.5 ? `${prefixes.random()} ${str}` : str;
};

const owoConvert = (str) => {
  const owo = entities
    .decode(str)
    .replace(/r/g, "w")
    .replace(/l/g, "w")
    .replace(/R/g, "W")
    .replace(/L/g, "W")
    .replace(/https?:\/\/[^\s]+/g, "");

  const extraCringe = prefix(addFaces(owo));

  return extraCringe.length > parseInt(MAX_TWEET_LENGTH) ? owo : extraCringe;
};

module.exports = owoConvert;
