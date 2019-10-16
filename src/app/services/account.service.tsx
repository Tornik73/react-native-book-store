import Axios from "axios";
import { LoginModel } from "../shared/model/login/login.model";
import { environment } from "../environments/environment";
import AsyncStorage from "@react-native-community/async-storage";
import { UserModel } from "../shared/model";

export const AccountService = {
    login: async (login: string, password: string): Promise<LoginModel> => {
        const response = await Axios.post<LoginModel>(`${environment.apiUrl}authenticate/`, {email: login, password: password})
                        .then(response => response.data);
        AsyncStorage.setItem('token', response.token);
        AsyncStorage.setItem('img', response.img);
        return response;
    },
    logout: (): Promise<any> => {
        const response = AsyncStorage.clear();
        return response;
    },
    putUser: async (user: UserModel): Promise<UserModel> => {
        const response = await Axios.put<UserModel>(`${environment.apiUrl}users/${user.id}`, {updatedUser: user})
                        .then((response: any) => {
                            const serverResponse: UserModel = response.data.data;
                            return serverResponse;
                        });
        let img: string;
        if(response.img !== null){
            img = response.img;
        } else {
            img = 'no image available';
        }
        AsyncStorage.setItem('currentUser', JSON.stringify(response));     
        AsyncStorage.setItem('img', img);                
        return response;
    }
};