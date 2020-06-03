const {
  TWITTER_CONSUMER_KEY,
  TWITTER_CONSUMER_SECRET,
  TWITTER_ACCESS_TOKEN,
  TWITTER_ACCESS_TOKEN_SECRET,
} = process.env;
const TwitterUpdate = require("twit");
const twitterUpdate = new TwitterUpdate({
  consumer_key: TWITTER_CONSUMER_KEY,
  consumer_secret: TWITTER_CONSUMER_SECRET,
  access_token: TWITTER_ACCESS_TOKEN,
  access_token_secret: TWITTER_ACCESS_TOKEN_SECRET,
});

const sendTweet = (status) => {
  return new Promise((resolve, reject) => {
    twitterUpdate.post("statuses/update", { status }, (err, data, resp) => {
      if (err) reject(err);
      resolve();
    });
  });
};

module.exports = sendTweet;
