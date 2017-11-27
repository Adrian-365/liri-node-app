// At the top of the liri.js file, write the code you need to grab the data from keys.js. 
var keys = require('./keys.js');
var request = require('request');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var fs = require('fs');
var spawn = require('child_process').spawn;
//Then store the keys in a variable.
var client = new Twitter({
    consumer_key: keys.consumer_key,
    consumer_secret: keys.consumer_secret,
    access_token_key: keys.access_token_key,
    access_token_secret: keys.access_token_secret
  });

var spotify = new Spotify({
    id: keys.spotifyId,
    secret: keys.spotifySecret
});

var omdbapi = keys.omdbapi;

// Make it so liri.js can take in one of the following commands:
var nodeArgs = process.argv;
//var for search term, and add a space between if more than one word.
var searchTerm = '';
for (var i=3; i<nodeArgs.length; i++) {
    searchTerm += nodeArgs[i] + ' ';  
};
//Specially formatted var for movie searches with a + sign between words and nothing in front.  This gets more accurate results.
var movieSearchTerm = ''
for (var i=3; i<nodeArgs.length; i++) {
    movieSearchTerm += nodeArgs[i]+'+';  
};

// my-tweets----------------------------------------------------
if (nodeArgs[2] === 'my-tweets') {
// This will show your last 20 tweets and when they were created 
var params = {screen_name: searchTerm};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
      for (var j=0; j<tweets.length && j<20; j++) {
    console.log("Tweet # " + (j+1));
    console.log(tweets[j].text);
    console.log(tweets[j].created_at);
      }
    
  }
});
}
// spotify-this-song--------------------------------------------
else if (nodeArgs[2] === 'spotify-this-song') {
    // If no song is provided then your program will default to "The Sign" by Ace of Base. 
    if (searchTerm === '') {
        searchTerm = 'The Sign artist:ace of base';
    }
    else {
        searchTerm = searchTerm;
    }

    spotify.search({ type: 'track', query: searchTerm, limit: 1, market: 'US', }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       
    //   console.log(JSON.stringify(data, null, 2)); 
// Artist(s)
// The song's name
// A preview link of the song from Spotify
// The album that the song is from
    console.log("ARTIST(S):    "+data.tracks.items[0].album.artists[0].name);
    console.log("SONG NAME:    "+data.tracks.items[0].name);
    console.log("PREVIEW LINK: "+data.tracks.items[0].preview_url);
    console.log("ALBUM:        "+data.tracks.items[0].album.name);
      });
}
// movie-this----------------------------------------------------
else if (nodeArgs[2] === 'movie-this') {
    // If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
    if (movieSearchTerm === '') {
        movieSearchTerm = 'Mr+Nobody';        
    }
    else {
        movieSearchTerm = movieSearchTerm;
        };        
    // console.log(movieSearchTerm);

    // Use Request to grab data from the OMDB API.
    request('http://www.omdbapi.com/?t='+movieSearchTerm+'&apikey='+omdbapi, function (error, response, body) {
    // console.log('error:', error); // Print the error if one occurred
    // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    // console.log(JSON.stringify(response, null, 2)); 
    //Parse the body into a JSON that we can work with
    var bodyObject = JSON.parse(body);
    // // * Title of the movie
    console.log('TITLE:           '+bodyObject.Title);
    // * Year the movie came out.
    console.log('YEAR:            '+bodyObject.Year);  
    // * IMDB Rating of the movie.
    console.log('IMDB RATING:     '+bodyObject.Ratings[0].Value);
    // * Rotten Tomatoes Rating of the movie.
    console.log('ROTTEN TOMATOES: '+bodyObject.Ratings[1].Value);
    // * Country where the movie was produced.
    console.log('COUNTRY:         '+bodyObject.Country);
    // * Language of the movie.
    console.log('LANGUAGE:        '+bodyObject.Language);
    // * Plot of the movie.
    console.log('PLOT:            '+bodyObject.Plot);
    // * Actors in the movie.
    console.log('ACTORS:          '+bodyObject.Actors);
  });   
    
}
// do-what-it-says----------------------------------------------
else if (nodeArgs[2] === 'do-what-it-says') {
    // Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
    fs.readFile('random.txt', "utf8", function(err, data) {
        if (err) {
            console.log(err);
        } else {
            var splitArr = data.split(',');
            var operator = splitArr[0];
            var queryTerm = splitArr[1];
            console.log('operator: '+operator);
            console.log('queryTerm: '+queryTerm);

            // splitArr.forEach(function(elem) {
            //     console.log(elem);
            // });
    // It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
    // Feel free to change the text in that document to test out the feature for other commands
    
            spawn(process.execPath, [operator, queryTerm]) ;
            }
        });

        


}

//HANDLING WRONG COMMANDS-------------------------------------------
else {
    console.log("Dude, that command was not recognized. Below are the available commands and the format:")
    console.log('COMMANDS: my-tweets, spotify-this-song, movie-this, do-what-it-says');
    console.log('FORMAT: node liri.js [command] [search term]');
}

// BONUS

// In addition to logging the data to your terminal/bash window, output the data to a .txt file called log.txt.
// Make sure you append each command you run to the log.txt file.
// Do not overwrite your file each time you run a command.
