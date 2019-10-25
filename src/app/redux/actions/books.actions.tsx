import { BooksActionEnum } from "../../shared/enums";
import { AuthorsBooksModel } from "../../shared/model/";

export function getAllBooks() {
  return {
      type: BooksActionEnum.GET_ALL_BOOKS_REQUEST
  }
}

export function getAllBooksSuccess(authorsBooks: AuthorsBooksModel) {
    return {
        responseToState: authorsBooks,
        type: BooksActionEnum.GET_ALL_BOOKS_SUCCESS,
    }
}

export function getAllBooksFailed(getAllBooksFailedError: any) {
    return {
        error: getAllBooksFailedError,
        type: BooksActionEnum.GET_ALL_BOOKS_FAILED,
    }
}