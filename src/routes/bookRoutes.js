const express = require('express');
const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app:bookRoutes');

// starting up mongodb -> Roberts-MacBook-Pro-2:bin robertlaws$ ./mongod
// connecting to mongodb server -> Roberts-MacBook-Pro-2:bin robertlaws$ ./mongo
// mongodb server location -> connecting to: mongodb://127.0.0.1:27017

const bookRouter = express.Router();

function router(nav) {
  bookRouter.route('/')
    .get((req, res) => {
      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryApp';

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Connected to server');
          const db = client.db(dbName);
          const col = await db.collection('books');
          const books = await col.find().toArray();
          res.render('bookListView', {
            nav,
            title: 'New Library',
            books
          });
        } catch (err) {
          debug(err.stack);
        }
        client.close();
      }());
    });

  bookRouter.route('/:id')
    .get((req, res) => {
      const { id } = req.params;
      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryApp';

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Connected to server');
          const db = client.db(dbName);
          const col = await db.collection('books');
          const book = await col.findOne({ _id: new ObjectID(id) });

          debug(book);

          res.render('bookView', {
            nav,
            title: 'New Library',
            book
          });
        } catch (err) {
          debug(err.stack);
        }
      }());
    });
  return bookRouter;
}

module.exports = router;
