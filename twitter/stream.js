const TwitterStream = require("node-tweet-stream");
const { TWEET, ERROR } = require("../constants");
const {
  TWITTER_CONSUMER_KEY,
  TWITTER_CONSUMER_SECRET,
  TWITTER_ACCESS_TOKEN,
  TWITTER_ACCESS_TOKEN_SECRET,
} = process.env;

const setStream = ({ userId, username }, cb) => {
  const twitter = new TwitterStream({
    consumer_key: TWITTER_CONSUMER_KEY,
    consumer_secret: TWITTER_CONSUMER_SECRET,
    token: TWITTER_ACCESS_TOKEN,
    token_secret: TWITTER_ACCESS_TOKEN_SECRET,
  });

  twitter.on(TWEET, (t) => {
    if (
      t.user.screen_name.toLowerCase() === username.toLowerCase() && // Avoid mentions or replies, only original tweets
      !t.text.startsWith("RT") // Avoid RTs
    ) {
      console.log(`Tweet from @${t.user.screen_name}`);
      cb(t);
    }
  });

  twitter.on(ERROR, (err) => {
    console.log("TWITTER ERROR", err);
  });

  // Set up stream on user
  twitter.follow(userId);
};

module.exports = setStream;
