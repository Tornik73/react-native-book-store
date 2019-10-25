import { BooksActionEnum } from "../../shared/enums";
import { AuthorsBooksModel, GetAllBooksError } from "../../shared/model/";
import { BooksActionTypes } from "src/app/shared/model/books/books-action.model";

export function getAllBooks(): BooksActionTypes {
  return {
      type: BooksActionEnum.GET_ALL_BOOKS_REQUEST
  }
}

export function getAllBooksSuccess(authorsBooks: AuthorsBooksModel): BooksActionTypes {
    return {
        response: authorsBooks,
        type: BooksActionEnum.GET_ALL_BOOKS_SUCCESS,
    }
}

export function getAllBooksFailed(getAllBooksFailedError: GetAllBooksError): BooksActionTypes {
    return {
        error: getAllBooksFailedError,
        type: BooksActionEnum.GET_ALL_BOOKS_FAILED,
    }
}