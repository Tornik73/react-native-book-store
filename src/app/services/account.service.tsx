import Axios from "axios";
import { LoginModel } from "../shared/model/api/login/login.model";
import { environment } from "../environments/";
import AsyncStorage from "@react-native-community/async-storage";

export const AccountService = {
    login: async (login: string, password: string): Promise<LoginModel> => {
        let response = await Axios.get<LoginModel>(`${environment.apiUrl}user/${login}/${password}`).then(response => response.data);
        AsyncStorage.setItem('token', response.loginToken);
        return response;
    }
};