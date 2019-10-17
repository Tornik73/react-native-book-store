import { UserActionsEnum } from "../../shared/enums/"
import { BookService } from '../../services/Book.service';
import { AuthorsBooksModel } from "src/app/shared/model";

export function getAllBooks() {
    return async (dispatch: any) => {
        await BookService.getAllBooks()
            .then((response) => dispatch(getAllBooksSuccess(response))).
            catch((err) => console.log(err));
    }
}

export function getAllBooksSuccess(response: AuthorsBooksModel) {
    return {
        responseToState: response,
        type: UserActionsEnum.GET_ALL_BOOKS_SUCCESS,
    }
}