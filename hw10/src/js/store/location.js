import api from '../services/auth.service.js';


class Location {
    constructor(api) {
        this.api = api;
    }
   
    async initCountries() {
        const response = await Promise.resolve(this.api.countries());
        const countries = response;
        this.countries = this.serializeCountries(countries);
        return response;
    }

    async initCities(value) {

        const code = this.getCountryCode(value);
        const response = await Promise.resolve(this.api.cities(code));
        const cities = response;
        this.cities = cities;

        return response;
    }
    serializeCountries(countries) {
        console.log(Object.values(countries));
        return Object.values(countries);
    }


    getCountryCode(value) {
        const index = this.countries.indexOf(value)+1;
        return index;
    }

}
const location = new Location(api);
export default location;