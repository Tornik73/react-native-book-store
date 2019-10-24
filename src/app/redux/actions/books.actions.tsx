import { UserActionsEnum } from "../../shared/enums"
import { BookService } from '../../services/Book.service';
import { AuthorsBooksModel } from "src/app/shared/model";

export function getAllBooks() {
  return {
      type: UserActionsEnum.GET_ALL_BOOKS_REQUEST
  }
}

export function getAllBooksSuccess(response: AuthorsBooksModel) {
    return {
        responseToState: response,
        type: UserActionsEnum.GET_ALL_BOOKS_SUCCESS,
    }
}