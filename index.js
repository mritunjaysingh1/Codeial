const express = require('express');
const port = 8000;

const app = express();
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const cookieParser = require('cookie-parser');
//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-startegy');
const passportGoogle = require('./config/passport-google-auth-strategy');
const MongoStore = require('connect-mongo');
const sassMiddleware =require('node-sass-middleware');
const flash = require('connect-flash');
const customMware = require('./config/middleware');


app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));


app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static('./assets'));
// make the uploads path available to the browser
app.use('/uploads', express.static(__dirname + '/uploads'));

app.use(expressLayouts);

//extract script and style from sub pages into layouts

app.set('layout extractStyles' , true);
app.set('layout extractScripts' , true);




//set up the view engine

app.set('view engine' , 'ejs');
app.set('views' , './views');
//mongo store is used to store the session cookie in db
app.use(session({
    name : 'codeial',
    //todo change the secret before deployment in production mode
    secret: 'something',
    saveUninitialized: false,
    resave : false,
    cookie : {
        maxAge : (1000*60*100)
    },
    store : MongoStore.create({
        mongoUrl : 'mongodb://127.0.0.1/codeial_development',
        autoRemove : 'disabled'
    },
    function(err){
        console.log(err || 'Connect-mongodb setup ok');
    }
    )
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);
app.use('/' , require('./routes'));

app.listen(port , function(err)
{
    if(err)
    {
        console.log(`Error in running the server ${err}`);
        return;
    }

    console.log(`Server running on port : ${port}`);
})