//load environment variables
require('dotenv').config();

//dependencies
const express = require('express'),
  app = express(),
  port = process.env.PORT || 8080,
  expressLayouts = require('express-ejs-layouts')
  mongoose = require('mongoose'),
  bodyParser = require('body-parser');

//configure application
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

//set routes
app.use(require('./app/routes'));

//start server
app.listen(port, ()=> {
  console.log(`App listening on http://localhost:${port}`);
});
