const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');

//var dbConnection = require('./models/dbConnectionPool');
const db = require('./config/keys').mongoURI;

//connect to mongoDB
mongoose
  .connect(db,
    {useNewUrlParser: true,
     useUnifiedTopology: true,
     poolSize: 500,
     useCreateIndex: true})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

var signUpSignIn = require('./routes/api/signUpSignIn');

const app = express();
app.set('view engine', 'ejs');
const port = process.env.PORT || 5001;

//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

//Body Parser Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Allow Access Control
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

// Passport Config
require('./config/passport')(passport);

// Passport middleware
app.use(passport.initialize());

//Use Routes

app.use('/',signUpSignIn);

app.get('/',(req,res) => res.send('Hello World!!'));

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});