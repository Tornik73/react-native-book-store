import React, { Component } from 'react';
import { AuthorsBooksModel } from '../shared/model';
import { environment } from '../environments/environment';
import Axios from 'axios';

interface Props {}
interface State {}

export class BookService extends Component<Props, State> {
    public static async getAllBooks(): Promise<AuthorsBooksModel> {
        const response = await Axios.get<AuthorsBooksModel>(`${environment.apiUrl}books/`)
                        .then(response => response.data)
                        .catch(err => err);
        // console.log(response);
        return response;
    }
}