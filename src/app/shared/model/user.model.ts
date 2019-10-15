export interface UserModel {
    id: number | null;
    email: string;
    name: string;
    lastname: string;
    username: string;
    telephone: string;
    age: number | null;
    country: string;
    gender: string;
    img: string;
    isAdmin: boolean;
}