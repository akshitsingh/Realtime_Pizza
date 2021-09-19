const express = require('express');
const app = express();
const path = require('path');
const ejs = require('ejs');
const expressLayout = require('express-ejs-layouts');
const mongoose  = require('mongoose')
const session = require('express-session')
require('dotenv').config();
const flash = require('express-flash')
const MongoDbStore = require('connect-mongo') 


const initRoutes = require('./routes/web');
const passport = require('passport');

const PORT = process.env.PORT || 3000;

global.__baseDir = __dirname


//Database connection
const url = 'mongodb://localhost:27017/pizza'
mongoose.connect(url,{  
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Database Connected successfully");
});

 


//session config
app.use(session({
    secret : process.env.COOKIE_SECRET,
    resave : false,
    saveUninitialized : false,
    store :  MongoDbStore.create({
        mongoUrl: 'mongodb://localhost:27017/pizza',
        collectionName : 'session'
    }),
    cookie : { maxAge : 1000 * 60 *60 *24 } // 24 hours
}))

//passport config
const passportInit = require('./app/config/passport');
passportInit(passport);
app.use(passport.initialize())
app.use(passport.session())


app.use(flash())

//Global middleware
app.use((req,res,next)=>{
    res.locals.session = req.session;
    res.locals.user = req.user;
    next();
})

// app.use(expressLayout);
app.use(express.static('public'))
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(expressLayout);
app.set('views',path.join(__dirname,'app/resources/views'));
app.set('view engine','ejs');

initRoutes(app);

app.listen(PORT , ()=>{
    console.log("listening on port",+ PORT)
})