import { Author, Book } from './index';

export interface AuthorsBooksModel {
    authorId: number;
    bookId: number;
    author: Author;
    book: Book;
}
