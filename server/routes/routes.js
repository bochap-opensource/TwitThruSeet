/**
 * Created by dseet on 6/9/2014.
 */
module.exports = function (app, passport) {
    // =====================================
    // HOME PAGE SPA Start page ========
    // =====================================
    app.get('/', index);


    app.get('/partials/twitterService', isLoggedIn);

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
    app.get('/auth/twitter/callback',
        passport.authenticate('twitter', {
            successRedirect: '/twitterService',
            failureRedirect: '/'
        }));


/*    // JSON API
    app.get('/api/name', api.name);*/

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

    function index(req, res) {
        console.log(req.path);
        res.render('index');
    }
}