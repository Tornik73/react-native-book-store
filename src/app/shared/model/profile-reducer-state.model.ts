import { AuthorsBooksModel } from "./authorBook.model";

export interface ProfileReducerState {
    profileImg: string;
    response: any;
    booksResponse: AuthorsBooksModel[];
}