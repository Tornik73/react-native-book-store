import { BooksActionEnum } from '../../shared/enums/'
import { BooksReducerState } from '../../../app/shared/model';

const INIT_STATE: BooksReducerState = {
    booksResponse: []
}

export default function booksReducer(state = INIT_STATE, action: any) {
    switch (action.type) {
        case BooksActionEnum.GET_ALL_BOOKS_REQUEST: 
            return {
                ...state,
            }
        case BooksActionEnum.GET_ALL_BOOKS_SUCCESS:
            state.booksResponse = action.responseToState;
            return {
                ...state,
            }
        case BooksActionEnum.GET_ALL_BOOKS_SUCCESS:
            state.booksResponse = action.responseToState;
            return {
                ...state,
            }
        default:
            return state
    }

}