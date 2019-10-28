import { BooksActionEnum } from "../../shared/enums/"
import { BooksActionTypes } from "../../shared/model/books/books-action.model";
import { BooksReducerState } from "../../shared/model/books/books-reducer-state.model"


const INIT_STATE: BooksReducerState = {
    booksResponse: []
}

export default function booksReducer(state = INIT_STATE, action: BooksActionTypes) {

    switch (action.type) {
        case BooksActionEnum.GET_ALL_BOOKS_REQUEST: 
            return {
                ...state,
            }
        case BooksActionEnum.GET_ALL_BOOKS_SUCCESS: 
            state.booksResponse = action.response;
            return {
                ...state,
            }

        case BooksActionEnum.GET_ALL_BOOKS_FAILED:
            return {
                ...state,
            }
        default:
            return state
    }

}