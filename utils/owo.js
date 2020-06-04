const $ = require("arrayfriend");
const Entities = require("html-entities").AllHtmlEntities;
const { faces, prefixes } = require("../config.json").customization;
const { MAX_TWEET_LENGTH } = process.env;

const entities = new Entities(); // For decoding encoded tweets

// Randomly add faces to tweet between sentences
const addFaces = (str) => {
  const faceOptions = $(...faces);

  const sentenceCount = (str.match(/. /g) || []).length;

  for (let i = 0; i < sentenceCount; i++) {
    // Replace periods in sentences randomly, only 50% of the time
    if (Math.random() > 0.5) {
      str = str.replace(". ", ` ${faceOptions.random()} `);
    }
  }

  return str;
};

// Randomly prefix some tweets with * prefixes
const prefix = (str) => {
  const prefixOptions = $(...prefixes);
  return Math.random() > 0.5 ? `${prefixOptions.random()} ${str}` : str;
};

// Convert standard tweet to owo
const owoConvert = (str) => {
  const owo = entities
    .decode(str)
    .replace(/r/g, "w")
    .replace(/l/g, "w")
    .replace(/R/g, "W")
    .replace(/L/g, "W")
    .replace(/https?:\/\/[^\s]+/g, ""); // Remove all links (can cause error w/ Twitter API)

  const extraCringe = prefix(addFaces(owo));

  // Send extra cingey tweet if alotted space - since more characters added - tweet may be over twitters character limit
  // in that case, send less cringey owo tweet (same length as OG tweet)
  return extraCringe.length > parseInt(MAX_TWEET_LENGTH) ? owo : extraCringe;
};

module.exports = owoConvert;
