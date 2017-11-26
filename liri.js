// At the top of the liri.js file, write the code you need to grab the data from keys.js. 
var keys = require('./keys.js');
var request = require('request');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
//Then store the keys in a variable.
var client = new Twitter({
    consumer_key: keys.consumer_key,
    consumer_secret: keys.consumer_secret,
    access_token_key: keys.access_token_key,
    access_token_secret: keys.access_token_secret
  });

// var consumer_key = keys.consumer_key;
// var consumer_secret = keys.consumer_secret;
// var access_token_key = keys.access_token_key; 
// var access_token_secret = keys.access_token_secret;

// Make it so liri.js can take in one of the following commands:
var nodeArgs = process.argv;

var searchTerm = '';

for (var i=3; i<nodeArgs.length; i++) {
    searchTerm += ' ' + nodeArgs[i];  
};

// my-tweets
if (nodeArgs[2] === 'my-tweets') {
// This will show your last 20 tweets and when they were created at in your terminal/bash window.
var params = {screen_name: searchTerm};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
      for (var j=0; j<tweets.length && j<20; j++) {
    console.log("Tweet # :" + (j+1));
    console.log(tweets[j].text);
    console.log(tweets[j].created_at);
      }
    
  }
});
}
// spotify-this-song
else if (nodeArgs[2] === 'spotify-this-song') {
// Artist(s)
// The song's name
// A preview link of the song from Spotify
// The album that the song is from
// If no song is provided then your program will default to "The Sign" by Ace of Base. 
}
// movie-this
else if (nodeArgs[2] === 'movie-this') {
    // * Title of the movie.
    // * Year the movie came out.
    // * IMDB Rating of the movie.
    // * Rotten Tomatoes Rating of the movie.
    // * Country where the movie was produced.
    // * Language of the movie.
    // * Plot of the movie.
    // * Actors in the movie.
    // If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
    
}
// do-what-it-says
else if (nodeArgs[2] === 'do-what-it-says') {
    // Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
    // It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
    // Feel free to change the text in that document to test out the feature for other commands
}

else {
    console.log("Command not recognized.")
    console.log('COMMANDS: my-tweets, spotify-this-song, movie-this, do-what-it-says');
    console.log('FORMAT: node liri.js [command] [search term]');
}

// BONUS

// In addition to logging the data to your terminal/bash window, output the data to a .txt file called log.txt.
// Make sure you append each command you run to the log.txt file.
// Do not overwrite your file each time you run a command.
