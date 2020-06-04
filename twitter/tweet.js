const TwitterUpdate = require("twit");
const { UPDATE_STATUS } = require("../constants");
const {
  TWITTER_CONSUMER_KEY,
  TWITTER_CONSUMER_SECRET,
  TWITTER_ACCESS_TOKEN,
  TWITTER_ACCESS_TOKEN_SECRET,
} = process.env;

// Sends Tweet
const sendTweet = (status) => {
  const twitterUpdate = new TwitterUpdate({
    consumer_key: TWITTER_CONSUMER_KEY,
    consumer_secret: TWITTER_CONSUMER_SECRET,
    access_token: TWITTER_ACCESS_TOKEN,
    access_token_secret: TWITTER_ACCESS_TOKEN_SECRET,
  });
  return new Promise((resolve, reject) => {
    twitterUpdate.post(UPDATE_STATUS, { status }, (err, data, resp) => {
      if (err) reject(err);
      resolve();
    });
  });
};

module.exports = sendTweet;
