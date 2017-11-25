// At the top of the liri.js file, write the code you need to grab the data from keys.js. Then store the keys in a variable.
var keys = require('keys');
var request = require('request');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');

var client = new Twitter({
    consumer_key: twitterKeys.consumer_key,
    consumer_secret: twitterKeys.consumer_secret,
    access_token_key: twitterKeys.access_token_key,
    access_token_secret: twitterKeys.access_token_secret
  });
   
  var params = {screen_name: 'nodejs'};
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      console.log(tweets);
    }
  });


// Make it so liri.js can take in one of the following commands:
var type = process.argv[2];
// my-tweets
// spotify-this-song
// movie-this
// do-what-it-says
// What Each Command Should Do

// node liri.js my-tweets
// This will show your last 20 tweets and when they were created at in your terminal/bash window.
// node liri.js spotify-this-song '<song name here>'
// This will show the following information about the song in your terminal/bash window
// Artist(s)
// The song's name
// A preview link of the song from Spotify
// The album that the song is from
// If no song is provided then your program will default to "The Sign" by Ace of Base.