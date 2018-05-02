require('dotenv').config();
var Twitter = require('twitter');

const express = require('express');
const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));

function Tweet(user_name, screen_name, tweet_date, tweet_body) {
	this.user_name = user_name;
	this.screen_name = screen_name;
	this.tweet_date = tweet_date;
	this.tweet_body = tweet_body;
};

// I might be able to get away with application only based auth
// Probably not worth looking into it at the moment, so I'm just
// going to go with a user based authentication
var client = new Twitter({
	consumer_key: process.env.TWITTER_CONSUMER_KEY,
	consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
	access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
	access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

var tweetArray = [];

client.get('statuses/user_timeline.json?screen_name=iamjohnoliver&count=50', function(error, tweets, response) {	
	if (error) throw error;
	tweets.forEach(function(tweet) {
		var dateSplit = tweet.created_at.split(" ");
		var date = dateSplit[1] + " " + dateSplit[2];
		tweetArray.push(
			new Tweet(
				tweet.user.name,
				tweet.user.screen_name,
				date,
				tweet.text
			)
		);
	});
});

app.get('/', function (req, res) {
	// With more time, figure out how to update UI in client.get callback
	if (tweetArray.length == 0) {
		res.send("No tweets in array, try refreshing.\n\n")
	} else {
		res.render('index', {tweets: tweetArray});
	}
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));
