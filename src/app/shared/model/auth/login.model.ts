export interface LoginSuccess {
    token: string;
    img: string;
}
export interface LoginError { 
    error: boolean,
    statusCode?: number,
    message: string
}
