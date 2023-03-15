/* eslint-disable import/extensions */
import {
  addBook, deleteBookById, editBookById, getAllBooks, getBookById,
} from './handler.js';

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addBook,
  },
  {
    method: 'GET',
    path: '/books',
    handler: getAllBooks,
  },
  {
    method: 'GET',
    path: '/books/{id}',
    handler: getBookById,
  },
  {
    method: 'PUT',
    path: '/books/{id}',
    handler: editBookById,
  },
  {
    method: 'DELETE',
    path: '/books/{id}',
    handler: deleteBookById,
  },
];

// eslint-disable-next-line import/prefer-default-export
export { routes };
