import { UserActionsEnum } from "../../enums";

export interface UserModel {
    // type?: UserActionsEnum,
    id: number | null;
    email: string;
    name: string;
    lastname: string;
    username: string;
    telephone: string;
    age: number | null;
    country: string;
    gender: string;
    isAdmin: boolean;
    img: string | null;
}