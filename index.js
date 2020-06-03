require("dotenv").config();
const { setStream, tweet } = require("./twitter");
const { twitterUser } = require("./config.json");
const { owo } = require("./utils");

// Handles incoming tweets
const tweetHandler = async ({ extended_tweet, text }) => {
  try {
    const ogTweetText = extended_tweet ? extended_tweet.full_text : text;
    const owoTweetText = owo(ogTweetText);

    await tweet(owoTweetText);
    console.log("Successfully sent tweet");
  } catch (err) {
    console.log("Error sending tweet", err);
  }
};

// Initialize Twitter Stream
const init = () => {
  setStream(twitterUser, tweetHandler);
};

init();
