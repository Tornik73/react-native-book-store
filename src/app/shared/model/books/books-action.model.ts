import { BooksActionEnum } from "../../enums";
import { AuthorsBooksModel } from "../authorBook.model";
import { GetAllBooksError } from "../books/book.model";

interface GetBooksRequestAction {
    type: typeof BooksActionEnum.GET_ALL_BOOKS_REQUEST;
}

interface GetBooksSuccessAction {
    type: typeof BooksActionEnum.GET_ALL_BOOKS_SUCCESS;
    response: AuthorsBooksModel[];
}

interface GetBooksFailedAction {
    type: typeof BooksActionEnum.GET_ALL_BOOKS_FAILED;
    error: GetAllBooksError;
}

export type BooksActionTypes =GetBooksSuccessAction | GetBooksRequestAction  | GetBooksFailedAction;
