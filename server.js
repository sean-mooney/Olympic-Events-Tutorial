//load environment variables
require('dotenv').config();

//dependencies
const express = require('express'),
  app = express(),
  port = process.env.PORT || 8080,
  expressLayouts = require('express-ejs-layouts')
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  session = require('express-session'),
  cookieParser = require('cookie-parser'),
  flash = require('connect-flash'),
  expressValidator = require('express-validator');

//configure application
//set sessions and cookie parser
app.use(cookieParser('secret'));
app.use(session({
  secret: process.env.SECRET,
  cookie: { maxAge: 60000 },
  resave: false, //forces the session to be saved back to the store
  saveUninitialized: false //don't save unmodified
}));
app.use(flash());

//tell express where to look for static assets
app.use(express.static(__dirname + '/public'));

//set ejs as our templating engine
app.set('view engine', 'ejs');
app.use(expressLayouts);

//connect to database
mongoose.connect(process.env.DB_URI);
mongoose.connection.on('connected',()=>{
  console.log('connected to database mongodb @ 27017');
})
//if Error
mongoose.connection.on('error',(err)=>{
  if (err){
    console.log('Error in Database Connection'+err);
  }
});

//use body parser to grab info from a form
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());

//set routes
app.use(require('./app/routes'));

//start server
app.listen(port, ()=> {
  console.log(`App listening on http://localhost:${port}`);
});
