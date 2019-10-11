import Axios from "axios";
import { LoginModel } from "../shared/model/login/login.model";
import { environment } from "../environments/environment";
import AsyncStorage from "@react-native-community/async-storage";

export const AccountService = {
    login: async (login: string, password: string): Promise<any> => {
        let response = await Axios.post<any>(`${environment.apiUrl}authenticate/`, {email: login, password: password})
                        .then(response => response);
        AsyncStorage.setItem('token', response.data.token);
        return response;
    },
    logout: (): Promise<any> => {
        const response = AsyncStorage.clear();
        return response;
    }
};