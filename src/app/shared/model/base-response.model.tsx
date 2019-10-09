import { ResultCodes } from '../../enums/result-codes.enum';

export interface IBaseResponseModel<T> {
    resultCode: ResultCodes | string,
    msg: string,
    data: T
}