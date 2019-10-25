import { AuthorsBooksModel } from "..";

export interface Book {
    id: number;
    title: string;
    author: string;
    price: number;
    description: string;
    img: string;
}

export interface GetAllBooksSuccess{
     data: AuthorsBooksModel,
};

export interface GetAllBooksError {
    error: boolean,
    statusCode?: number,
    message?: string
};