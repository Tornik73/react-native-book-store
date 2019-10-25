import { UserActionsEnum } from "../../../app/shared/enums";
import { takeEvery, all, fork, call, put } from "@redux-saga/core/effects";
import { BookService } from "../../../app/services";
import { getAllBooksSuccess } from "../actions/books.actions";
import { AuthorsBooksModel } from "src/app/shared/model";

function* handleBooksRequest() {

    try {
        const response: AuthorsBooksModel = yield call(BookService.getAllBooks);
        yield put(getAllBooksSuccess(response));
        // if((response as BooksError).error){
        //     yield put(book((response as BooksSuccess).error));
        // } else {
        //     yield put(loginSuccess());
        // }
    } catch(err) {
        // if (err instanceof Error) {
        //     yield put(loginFailed(err.stack!));
        // } else {
        //     yield put(loginFailed('An unknown error occured.'));
        // }
    }
}

function* watchLoginReqest() {
    yield takeEvery(UserActionsEnum.GET_ALL_BOOKS_REQUEST, handleBooksRequest);
}

function* BooksSaga() {
    yield all([fork(watchLoginReqest)])
}

export default BooksSaga;