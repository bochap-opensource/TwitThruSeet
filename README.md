# Welcome to Twit Thru Seet
Forked from [btford/angular-express-seed](https://github.com/btford/angular-express-seed) and spiced with [Twitter Bootstrap](https://github.com/twitter/bootstrap). jQuery added for convenience.

This application is a demonstration of using Node.Js, AngularJS and Twitter Bootstrap to create a responsive web application to access the Twitter API timeline and tweeting features. To begin please click on Twitter Service.

## How to use Twit Thru Seet

1. Go to Twitter and create your own app. Set the call back to http://127.0.0.1:3000/auth/twitter/callback
2. Clone the repository, run `npm install` to grab the dependencies for the server side.
3. Go to server/config and create the file authotization.js with the following content
    module.exports = {
    'twitterAuth': {
        'consumerKey': '[Your twitter key]',
        'consumerSecret': '[Your twitter secret]',
        'callbackURL': 'http://127.0.0.1:3000/auth/twitter/callback'
    }
};
4. Go into WebClient and run `bower install` to grab the dependencies for the client side.
and happy hacking!

### Running the app

Runs like a typical express app:

    node server/app.js

### Running tests

Coming soon!

### Receiving updates from upstream

Just fetch the changes and merge them into your project with git.


## Directory Layout
    
Coming soon!

## Contact

For more information on AngularJS please check out http://angularjs.org/
For more on Express and Jade, http://expressjs.com/ and http://jade-lang.com/ are
your friends.
