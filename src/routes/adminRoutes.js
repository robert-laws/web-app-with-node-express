const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:adminRoutes');

const adminRouter = express.Router();
const books = [
  {
    title: 'Hitchikers Guide to the Galaxy',
    genre: 'Science Fiction',
    author: 'Douglas Adams',
    read: true
  },
  {
    title: 'War and Peace',
    genre: 'Historical Fiction',
    author: 'Leo Tolstoy',
    read: false
  },
  {
    title: 'The Time Machine',
    genre: 'Science Fiction',
    author: 'H.G. Wells',
    read: false
  }
];

function router(nav) {
  adminRouter.route('/')
    .get((req, res) => {
      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryApp';

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Connected to server');
          const db = client.db(dbName);

          const response = await db.collection('books').insertMany(books);
          res.json(response);
        } catch (err) {
          debug(err.stack);
        }
        client.close();
      }());

      res.render('adminView', {
        nav,
        title: 'Administrative Area'
      });
    });
  return adminRouter;
}

module.exports = router;
