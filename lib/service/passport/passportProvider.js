/**
 * Created by dseet on 6/9/2014.
 */

module.exports.configure = function(passport, strategy) {
    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(obj, done) {
        done(null, obj);
    });

    passport.use(strategy);
}



