// makes the stylesheet available to the client
const path = require('path');
const express = require('express');
// set up handlebars as template engine 
const exphbs = require('express-handlebars');
// requirements to use expression-session and sequelize store 
const session = require('express-session');
const routes = require('./controllers');
const { env } = require('process');

const app = express();
const PORT = process.env.PORT || 3001;


const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: 'canyouguessmysecret',
  // telling our session to use cookies 
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// middleware that serves all files in the public folder as static assets 
app.use(express.static(path.join(__dirname, 'public')));

// turn on routes
app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});