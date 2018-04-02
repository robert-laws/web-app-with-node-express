const express = require('express');

const bookRouter = express.Router();

function router(nav) {
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
    }
  ];

  bookRouter.route('/')
    .get((req, res) => {
      res.render('bookListView', {
        nav,
        title: 'New Library',
        books
      });
    });

  bookRouter.route('/:id')
    .get((req, res) => {
      const { id } = req.params;
      res.render('bookView', {
        nav,
        title: 'New Library',
        book: books[id]
      });
    });
  return bookRouter;
}

module.exports = router;
