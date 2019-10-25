import { BooksActionEnum } from "../../../app/shared/enums";
import { takeEvery, all, fork, call, put } from "@redux-saga/core/effects";
import { BookService } from "../../../app/services";
import { getAllBooksSuccess, getAllBooksFailed } from "../actions/books.actions";
import { GetAllBooksSuccess, GetAllBooksError } from "src/app/shared/model";

function* handleBooksRequest() {

    try {
        const response: GetAllBooksSuccess | GetAllBooksError = yield call(BookService.getAllBooks);
        if((response as GetAllBooksError).error){
            yield put(getAllBooksFailed((response as GetAllBooksError)));
        } else {
            yield put(getAllBooksSuccess((response as GetAllBooksSuccess).data));
        }
    } catch(err) {
        if (err instanceof Error) {
            yield put(getAllBooksFailed({error: false, message: err.stack}));
        } else {
            yield put(getAllBooksFailed({error: false, message: 'An unknown error occured.'}));
        }
    }
}

function* watchLoginReqest() {
    yield takeEvery(BooksActionEnum.GET_ALL_BOOKS_REQUEST, handleBooksRequest);
}

function* BooksSaga() {
    yield all([fork(watchLoginReqest)])
}

export default BooksSaga;