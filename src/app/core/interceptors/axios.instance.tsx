import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';
import { environment } from '../../environments/environment';

const AxiosInstance = axios.create({
    baseURL: environment.apiUrl,
    headers: {
        'Content-Type': 'application/json'
    }
})

AxiosInstance.interceptors.request.use(async (config) => {
    console.log(123)
    let token: string | null = await AsyncStorage.getItem('token').then(token => token);;
    if (token) {
        config.headers['logintoken'] = token;
    } else {
        config.headers.Authorization = null;
    }
    console.log(config);
    return config;
});

export default AxiosInstance;