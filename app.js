const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public/')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

const nav = [
  { link: '/books', title: 'Books' },
  { link: '/authors', title: 'Authors' },
  { link: '/contact', title: 'Contact Us' }
];

const bookRouter = require('./src/routes/bookRoutes')(nav);
const adminRouter = require('./src/routes/adminRoutes')(nav);

app.use('/books', bookRouter);
app.use('/admin', adminRouter);

app.get('/', (req, res) => {
  res.render('index', {
    nav,
    title: 'New Library'
  });
});

app.listen(port, () => {
  debug(`Listening on port ${chalk.green(port)}`);
});
