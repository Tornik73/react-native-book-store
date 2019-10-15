import Axios from "axios";
import { LoginModel } from "../shared/model/login/login.model";
import { environment } from "../environments/environment";
import AsyncStorage from "@react-native-community/async-storage";

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
    }
};