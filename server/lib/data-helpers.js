"use strict";
// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    saveTweet: function(newTweet, callback) {
        db.collection("tweets").insertOne(newTweet);
        callback(null, true);
    },
    getTweets: function(callback) {
        const sortNewestFirst = (a, b) => a.created_at - b.created_at;
        db.collection("tweets").find().toArray(callback);
    }
  };
}
