import axios from '../plugins/axios';
import config from '../config/api.config';

class Api {
    constructor() {
        this.url = config.apiUrl;
    }

    async countries() {
        try {
            const response = await axios.get(`/location/get-countries`);
            console.log(response);
            return response;

        } catch (err) {
            return Promise.reject(err);
        }
    }

    async cities(country_index) {
        try {
            const response = await axios.get(`/location/get-cities/${country_index}`);
            console.log(response);
            return response;

        } catch (err) {
            return Promise.reject(err);
        }
    }


    async registration(email, password, nickname, first_name, last_name, phone, gender_orientation, city, country, date_of_birth_day, date_of_birth_month, date_of_birth_year) {
        try {
            const response = await axios.post(`/auth/signup`, JSON.stringify({
                email,
                password,
                nickname,
                first_name,
                last_name,
                phone,
                gender_orientation,
                city,
                country,
                date_of_birth_day,
                date_of_birth_month,
                date_of_birth_year
            }));
            console.log(response);
            return response;

        } catch (err) {
            return Promise.reject(err);
        }
    }

    async login(email, password) {
        try {
            const response = await axios.post(`/auth/login`, JSON.stringify({
                email,
                password,
            }));
            console.log(response);
            return response;

        } catch (err) {
            return Promise.reject(err);
        }
    }
}

const api = new Api();

export default api;
