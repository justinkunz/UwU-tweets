require("dotenv").config();
const { setStream, tweet } = require("./twitter");
const { twitterUser } = require("./config.json");
const { owo } = require("./utils");

// Handles incoming tweets
const tweetHandler = async ({ extended_tweet, text }) => {
  try {
    const ogTweetText = extended_tweet ? extended_tweet.full_text : text;
    const owoTweetText = owo(ogTweetText);

    console.log(`TWEETING:\n${owoTweetText}`);
    await tweet(owoTweetText);

    console.log("Successfully sent tweet\n");
  } catch (err) {
    if (status.startsWith("Status is a duplicate")) {
      console.log("==> Tweet is a duplicate\n");
    } else {
      console.log("Error sending tweet\n", err);
    }
  }
};

// Initialize Twitter Stream
const init = () => {
  setStream(twitterUser, tweetHandler);
  console.log("Listening for tweets");
};

init();
