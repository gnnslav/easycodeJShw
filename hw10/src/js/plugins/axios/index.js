import axios from 'axios';
import config from '../../config/api.config';
import interceptors from './interceptors';

const instance = axios.create({
    baseURL: config.apiUrl,
    headers: {
        'Content-Type': 'application/json',
    }
});
interceptors(instance);

export default instance;