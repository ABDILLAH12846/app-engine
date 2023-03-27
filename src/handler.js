/* eslint-disable no-else-return */
/* eslint-disable max-len */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable import/extensions */
import { nanoid } from 'nanoid';
import { books } from './books.js';

const front = (request, h) => h.file('public/index.html');
const css = (request, h) => h.file('public/style.css');

const addBook = (request, h) => {
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = request.payload;

  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const finished = readPage === pageCount ? true : false;

  const newNote = {
    id, name, year, author, summary, publisher, pageCount, readPage, reading, insertedAt, updatedAt, finished,
  };
  if (name !== undefined) {
    if (readPage > pageCount) {
      const response = h.response({
        status: 'fail',
        message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
      });
      response.code(400);
      return response;
    }

    books.push(newNote);

    const isSuccess = books.filter((note) => note.id === id).length > 0;

    if (isSuccess) {
      const response = h.response({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: {
          bookId: id,
        },
      });
      response.code(201);
      return response;
    }
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku.',
    });
    response.code(400);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal menambahkan buku. Mohon isi nama buku',
  });
  response.code(400);
  return response;
};
const getAllBooks = (request, h) => {
  const { reading, finished, name } = request.query;
  const book = books.filter((n) => n.name.toLowerCase() === name.toLowerCase())[0];
  const read = books.filter((n) => n.reading === true);
  const unread = books.filter((n) => n.reading === false);
  const finish = books.filter((n) => n.finished === true);
  const unfinish = books.filter((n) => n.finished === false);
  if (book !== undefined) {
    const response = h.response({
      status: 'success',
      data: {
        book,
      },
    });
    response.code(200);
    return response;
  } else if (reading === 1) {
    const response = h.response({
      status: 'success',
      data: {
        read,
      },
    });
    response.code(200);
    return response;
  } else if (reading === 0) {
    const response = h.response({
      status: 'success',
      data: {
        unread,
      },
    });
    response.code(200);
    return response;
  } else if (finished === 1) {
    const response = h.response({
      status: 'success',
      data: {
        finish,
      },
    });
    response.code(200);
    return response;
  } else if (finished === 0) {
    const response = h.response({
      status: 'success',
      data: {
        unfinish,
      },
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'success',
    data: {
      books,
    },
  });
  response.code(200);
  return response;
};

const getBookById = (request, h) => {
  const { id } = request.params;

  const book = books.filter((n) => n.id === id)[0];

  if (book !== undefined) {
    const response = h.response({
      status: 'success',
      data: {
        book,
      },
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  response.code(404);
  return response;
};
const editBookById = (request, h) => {
  const { id } = request.params;

  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = request.payload;
  const updatedAt = new Date().toISOString();

  const index = books.findIndex((note) => note.id === id);
  // console.log(index);
  if (index !== -1) {
    if (name !== undefined) {
      if (readPage <= pageCount) {
        books[index] = {
          ...books[index],
          name,
          year,
          author,
          summary,
          publisher,
          pageCount,
          readPage,
          reading,
          updatedAt,
        };

        const response = h.response({
          status: 'success',
          message: 'Buku berhasil diperbarui',
        });
        response.code(200);
        return response;
      }
      const response = h.response({
        status: 'fail',
        message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
      });
      response.code(400);
      return response;
    }
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};
const deleteBookById = (request, h) => {
  const { id } = request.params;

  const index = books.findIndex((note) => note.id === id);

  if (index !== -1) {
    books.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};
export {
  addBook, getAllBooks, getBookById, editBookById, deleteBookById, front, css,
};
