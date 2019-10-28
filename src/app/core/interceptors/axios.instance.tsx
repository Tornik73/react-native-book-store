import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';
import { environment } from '../../environments/environment';
import { AsyncStorageEnum } from '../../shared/enums/';

const AxiosInstance = axios.create({
    baseURL: environment.apiUrl,
    headers: {
        'Content-Type': 'application/json'
    }
})

AxiosInstance.interceptors.request.use(async (config) => {
    const token: string | null = await AsyncStorage.getItem(AsyncStorageEnum.TOKEN).then(token => token);
    if (token) {
        config.headers[AsyncStorageEnum.TOKEN] = token;
    } else {
        config.headers.Authorization = null;
    }
    return config;
});

export default AxiosInstance;