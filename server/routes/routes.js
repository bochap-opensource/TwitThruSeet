/**
 * Created by dseet on 6/9/2014.
 */
var bigInt = require("big-integer");
var url = require('url');
var utf8 = require('utf8');
var fs = require('fs');

module.exports = function (app, passport) {
    // =====================================
    // HOME PAGE SPA Start page ========
    // =====================================
    app.get('/', index);
    app.get('/partials/twitterService', isLoggedIn, function (req, res) {
        getTwitterTimeLine(req, function (err, data, response) {
            if(err) {
                res.send(err, 500);
                return;
            }
            res.render('partials/twitterService');
        });
    });

// GET /auth/twitter
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Twitter authentication will involve redirecting
//   the user to twitter.com.  After authorization, the Twitter will redirect
//   the user back to this application at /auth/twitter/callback
    app.get('/auth/twitter',
        passport.authenticate('twitter')
    );

// GET /auth/twitter/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
    app.get('/auth/twitter/callback', passport.authenticate('twitter', {
        successRedirect: '/twitterService',
        failureRedirect: '/'
    }));

    // JSON API
    app.get('/api/twitter/timeline', isLoggedIn, function (req, res) {
        getTwitterTimeLine(req, function (err, data, response) {
            if(err) {
                res.send(err, 500);
                return;
            }
            res.send(data);
        });
    });
    function isValidGeoCoord(value) {
        var value = parseInt(value);
        if(!isNaN(value) && value >= -180 && value <= 180) return true;
        return false;
    }
    // JSON API
    app.post('/api/twitter/update', isLoggedIn, function (req, res) {
        var uri = 'update.json';
        var encoding = "application/json";
        var path;
        var body = { status: utf8.encode(req.body.status)  };
        if(req.body.latitude && isValidGeoCoord(req.body.latitude)) body.lat = utf8.encode(req.body.latitude);
        if(req.body.longitude && isValidGeoCoord(req.body.longitude)) body.long = utf8.encode(req.body.longitude);

/*        if(req.files != undefined && req.files.file != undefined) {
            uri = "update_with_media.json";
            encoding = "multipart/form-data";
            path = req.files.file.path;
            body.media = [ fs.createReadStream(path)  ];
        }*/
        passport._strategies.twitter._oauth.post(
            'https://api.twitter.com/1.1/statuses/' + uri,
            req.user.twitter_token,
            req.user.twitter_token_secret,
            body, encoding, function (err, data, response) {
                if(!err) {
                    res.send(500, err);
                }
                if(fs.existsSync())
                fs.exists(path, function (exists) {
                    if(exists) {
                        fs.unlink(path);
                    }
                })
                res.send(200);
            });
    });

    // =====================================
    // Loading partials for AngularJS
    // =====================================
    app.get('/partials/:name', function (req, res) {
        var name = req.params.name;
        res.render('partials/' + name);
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    // redirect all others to the index (HTML5 history)
    app.get('*', index);


    // route middleware to make sure a user is logged in
    function isLoggedIn(req, res, next) {
        if (!req.isAuthenticated())
            res.send(401);
        else
            next();
    }

    function getTwitterTimeLine(req, callback) {
        var uri = 'https://api.twitter.com/1.1/statuses/home_timeline.json?count=10';
        if(req.query.since_id) uri += '&since_id=' + req.query.since_id;
        if(req.query.max_id) uri += '&max_id=' + req.query.max_id;
        passport._strategies.twitter._oauth._performSecureRequest(
            req.user.twitter_token,
            req.user.twitter_token_secret,
            'GET',
            uri,
            null,
            null, null, function (err, data, response) {
                var processedData;
                if(!err) {
                    result = [];
                    var max_id, since_id;
                    var jsonData = JSON.parse(data);
                    for (var i = 0; i < jsonData.length; i++) {
                        var record = jsonData[i];
                        result.push({
                            id_str: record.id_str,
                            created_at: record.created_at,
                            text: record.text,
                            user_screen_name: record.user.screen_name,
                            user_name: record.user.name,
                            user_profile_image_url: record.user.profile_image_url
                        });
                        if(i == 0) since_id = record.id_str;
                        if(i == (jsonData.length - 1)) max_id = (bigInt(record.id_str) - 1).toString();
                    }
                    processedData = {
                        result: result,
                        since_id: since_id,
                        max_id: max_id
                    };
                }
                callback(err, processedData, response);
            });
    }

    function index(req, res) {
        res.render('index');
    }
}