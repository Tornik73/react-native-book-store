import Axios from "axios";
import { LoginSuccess, LoginError } from "../shared/model/auth/login.model";
import { environment } from "../environments/environment";
import AsyncStorage from "@react-native-community/async-storage";
import { UserModel } from "../shared/model";
import AxiosInstance from "../core/interceptors/axios.instance";
import { PutUserSuccess, PutUserError } from "../shared/model/user/user-profile.models";
import { AsyncStorageEnum } from "../shared/enums/async-storage.enum";
export const AccountService = {
    login: async (login: string, password: string): Promise<LoginSuccess | LoginError> => {
        const response = await Axios.post<LoginSuccess | LoginError>(`${environment.apiUrl}authenticate/`, 
            {
                email: login, 
                password: password
            })
            .then(response => response.data)
            .catch(error => console.log(error));

        if(response as LoginSuccess) {
            AsyncStorage.setItem(AsyncStorageEnum.TOKEN, (response as LoginSuccess).token);
            AsyncStorage.setItem(AsyncStorageEnum.IMG, (response as LoginSuccess).img);
            return response as LoginSuccess;
        }
        return response as LoginError;
    },
    getUserById: async (userID: number): Promise<UserModel> => {
        const response = await Axios.get<UserModel>(`${environment.apiUrl}users/${userID}`)
            .then((response) => {
                return response.data;
            })
        return response;    
    },
    putUser: async (user: UserModel): Promise<PutUserSuccess | PutUserError> => {
        
        const response = await AxiosInstance
            .put<PutUserSuccess | PutUserError>(`${environment.apiUrl}users/${user.id}`, {...user})
                .then(response => response.data)
                .catch(error => console.log(error));

        if((response as PutUserSuccess).success && user.id) {
            const serverGetResponse = await AccountService.getUserById(user.id)
                .then((response) => response)
                .catch(error => console.error(error));
                if(serverGetResponse && serverGetResponse.img){
                    AsyncStorage.setItem(AsyncStorageEnum.IMG, serverGetResponse.img);
                }
                return response as PutUserSuccess;
        }

        return response as PutUserError;
    },
};