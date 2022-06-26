const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
// makes the stylesheet available to the client
const path = require('path');
// set up handlebars as template engine 
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});
// requirements to use expression-session and sequelize store 
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: 'Super secret secret',
  // telling our session to use cookies 
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(session(sess));
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