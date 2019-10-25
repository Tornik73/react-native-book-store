import React, { Component } from 'react';
import { AuthorsBooksModel, GetAllBooksError, GetAllBooksSuccess } from '../shared/model';
import { environment } from '../environments/environment';
import Axios from 'axios';

interface Props {}
interface State {}

export class BookService extends Component<Props, State> {
    public static async getAllBooks(): Promise<GetAllBooksError | GetAllBooksSuccess> {
        const response = await Axios.get<GetAllBooksError | GetAllBooksSuccess>(`${environment.apiUrl}books/`)
                        .then(response => response.data)
                        .catch(err => console.log(err));
        if((response as GetAllBooksSuccess)) {
            return (response as GetAllBooksSuccess);
        } else {
            return response as GetAllBooksError;
        }

    }
}