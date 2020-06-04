const TwitterStream = require("node-tweet-stream");
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

  twitter.on("tweet", (t) => {
    if (t.user.screen_name.toLowerCase() === username.toLowerCase()) {
      console.log(`tweety tweet from @${t.user.screen_name}`);
      cb(t);
    }
  });

  twitter.on("error", (err) => {
    console.log("TWITTER ERROR", err);
  });

  twitter.follow(userId);
};

module.exports = setStream;
