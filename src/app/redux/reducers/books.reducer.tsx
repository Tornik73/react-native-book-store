import { BooksActionEnum } from '../../shared/enums/'
import { BooksReducerState } from '../../../app/shared/model';
import { BooksActionTypes } from 'src/app/shared/model/books/books-action.model';

const INIT_STATE: BooksReducerState = {
    booksResponse: []
}

export default function booksReducer(state = INIT_STATE, action: BooksActionTypes) {

    switch (action.type) {
        case BooksActionEnum.GET_ALL_BOOKS_REQUEST: 
            return {
                ...state,
            }
        case BooksActionEnum.GET_ALL_BOOKS_FAILED: {
            state.booksResponse = action.response;
            return {
                ...state,
            }
        }

        case BooksActionEnum.GET_ALL_BOOKS_FAILED:
            return {
                ...state,
            }
        default:
            return state
    }

}