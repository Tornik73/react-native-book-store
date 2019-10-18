export enum ResultCodes{
    SUCCESS = '0000',
    NO_DATA = '0001',
    INVALID_TOKEN = '9999'
}

export interface IBaseResponseModel<T> {
    resultCode: ResultCodes | string,
    msg: string,
    data: T
}