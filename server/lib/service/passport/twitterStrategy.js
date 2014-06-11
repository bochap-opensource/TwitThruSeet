/**
 * Created by dseet on 6/9/2014.
 */
var TwitterStrategy  = require('passport-twitter').Strategy;
module.exports.strategy = function(options) {
    return new TwitterStrategy({
            consumerKey: options.consumerKey,
            consumerSecret: options.consumerSecret,
            callbackURL: options.callbackURL
        },
        function(token, tokenSecret, profile, done) {
            // asynchronous verification, for effect...
            process.nextTick(function () {
                /*            console.log(token);
                 console.log(tokenSecret);
                 console.log(JSON.stringify(profile));*/
                // To keep the example simple, the user's Twitter profile is returned to
                // represent the logged-in user.  In a typical application, you would want
                // to associate the Twitter account with a user record in your database,
                // and return that user instead.
                profile.twitter_token = token;
                profile.twitter_token_secret = tokenSecret;
                return done(null, profile);
            });
        }
    );
}