require('dotenv').config();
var Twitter = require('twitter');

const express = require('express');
const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => res.render('index'));

app.listen(3000, () => console.log('Example app listening on port 3000!'));

// I might be able to get away with application only based auth
// Probably not worth looking into it at the moment, so I'm just
// going to go with a user based authentication
var client = new Twitter({
	consumer_key: process.env.TWITTER_CONSUMER_KEY,
	consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
	access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
	access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

client.get('statuses/user_timeline.json?screen_name=iamjohnoliver&count=100', function(error, tweets, response) {
	if (error) {
		console.log(error);
		throw error;
	}
	console.log(tweets);
});