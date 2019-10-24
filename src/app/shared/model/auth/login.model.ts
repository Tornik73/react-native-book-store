export interface LoginSuccess {
    token: string;
    img: string;
}
export interface LoginError {
    error: {    
        statusCode?: number,
        message: string
    }
}