import { books, authors } from "../libs/data.js";
import { pool } from "../db/index.js";

export async function getBooks() {
  const booksResult = await pool.query(`SELECT * FROM books`);
  return booksResult.rows;
}

export async function searchBooksByTitle(title) {
  const query = {
    name:'getBooksByTitile',
    text: 'SELECT * FROM books WHERE title LIKE %$1%',
    values: [title],
  };
  results = await pool.query(query);
  return results.rows;
}


// the code which follows is the code that i tried to change to make the searchBooksByTitle works, however it doesn't work, could you please explain why it fails

//   const books = await pool.query(`SELECT * FROM books`)
//   return books.filter(function (book) {
//     return book.title.toLowerCase().includes(searchTerm.toLowerCase());
//   });
// }

export function searchBooksByAuthor(searchTerm) {
  const authorNamesMatchingSearchTerm = authors.filter(function (author) {
    const authorName = `${author.first_name} ${author.last_name}`;
    return authorName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const authorIdsMatchingSearchTerm = authorNamesMatchingSearchTerm.map(
    function (author) {
      return author.id;
    }
  );

  return books.filter(function (book) {
    return authorIdsMatchingSearchTerm.includes(book.author_id);
  });
}

export function getBookById(id) {
  const found = books.find(function (book) {
    return book.id === id;
  });
  return found;
}

export function createBook(book) {
  books.push(book);
  return books[books.length - 1];
}

export function updateBookById(id, updates) {
  const foundIndex = books.findIndex(function (book) {
    return book.id === id;
  });
  books[foundIndex] = updates;
  return books[foundIndex];
}

export function deleteBookById(id) {
  const foundIndex = books.findIndex(function (book) {
    return book.id === id;
  });
  const item = books[foundIndex];
  books.splice(foundIndex, 1);
  return item;
}
