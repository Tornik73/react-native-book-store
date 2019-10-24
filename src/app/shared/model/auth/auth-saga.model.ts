import { AuthActionEnum } from "../../enums";

export default interface LoginRequestSagaModel {
    type: AuthActionEnum,
    loginToken: string;
    longitude: number;
    latitude: number;
    login: string;
    password: string;
}