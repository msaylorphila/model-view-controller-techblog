const path = require('path');
const express = require('express');
// // Import express-session
// // const session = require('express-session');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({})
const routes = require('./controllers');
const sequelize = require('./config/connection');
// // const helpers = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 3001;

// // Set up sessions
// // const sess = {
// //   secret: 'Super secret secret',
// //   resave: false,
// //   saveUninitialized: false,
// // };

// // app.use(session(sess));

// // const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});

// Dependencies
// const express = require('express');
// const exphbs = require('express-handlebars');
// const path = require('path');
// const hbs = exphbs.create({});


// // Sets up the Express App
// const app = express();
// const PORT = process.env.PORT || 3001;

// // Set Handlebars as the default template engine.
// app.engine('handlebars', hbs.engine);
// app.set('view engine', 'handlebars');

// // app.use(express.static(path.join(__dirname, 'public')));
// app.use(require('./controllers/home-routes'));

// // Starts the server to begin listening
// app.listen(PORT, () => {
//   console.log('Server listening on: http://localhost:' + PORT);
// });