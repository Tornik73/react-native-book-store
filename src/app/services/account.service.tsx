import Axios from "axios";
import { LoginModel } from "../shared/model/auth/login.model";
import { environment } from "../environments/environment";
import AsyncStorage from "@react-native-community/async-storage";
import { UserModel } from "../shared/model";
import AxiosInstance from "../core/interceptors/axios.instance";
import { IBaseResponseModel } from "../shared/model/base-response.model";
export const AccountService = {
    login: async (login: string, password: string): Promise<LoginModel> => {
        const response = await Axios.post<LoginModel>(`${environment.apiUrl}authenticate/`, {email: login, password: password})
                        .then(response => response.data);
        AsyncStorage.setItem('token', response.token);
        AsyncStorage.setItem('img', response.img);
        return response;
    },
    getUserById: async (userID: number): Promise<UserModel> => {
        const response = await Axios.get<UserModel>(`${environment.apiUrl}users/${userID}`)
            .then((response) => {
                return response.data;
            })
        return response;    
    },
    logout: async (): Promise<any> => {
        await AsyncStorage.removeItem('token');
        return await AsyncStorage.removeItem('img');
    },
    putUser: async (user: UserModel): Promise<UserModel> => {
        const response = await AxiosInstance.put<IBaseResponseModel<UserModel>>(`${environment.apiUrl}users/${user.id}`, {...user})
                        .then(async (response: any) => {
                            if(response.data.success && user.id){
                                const serverGetResponse = await AccountService.getUserById(user.id).then((response) => response);
                                return serverGetResponse;
                            }
                            return false;
                        });
        if(response){
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
        throw new Error('Error in put requset service');
    },
};