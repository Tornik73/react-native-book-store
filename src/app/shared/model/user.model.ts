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
    isAdmin: boolean;
    img: string | null;
}