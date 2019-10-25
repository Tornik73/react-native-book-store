import { BooksActionEnum } from "../../enums";
import { AuthorsBooksModel } from "../authorBook.model";
import { GetAllBooksError } from "../books/book.model";

interface GetBooksRequestAction {
    type: typeof BooksActionEnum.GET_ALL_BOOKS_REQUEST;
}

interface GetBooksSuccessAction {
    response: AuthorsBooksModel;
    type: typeof BooksActionEnum.GET_ALL_BOOKS_SUCCESS;
}

interface GetBooksFailedAction {
    error: GetAllBooksError;
    type: typeof BooksActionEnum.GET_ALL_BOOKS_FAILED;
}

export type BooksActionTypes = 
GetBooksRequestAction |
GetBooksSuccessAction | 
GetBooksFailedAction;
