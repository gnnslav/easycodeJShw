import axios from 'axios';
import API_URL from '../../config/api.config';
import interceptors from './interceptors';

const instance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});
interceptors(instance);

export default instance;