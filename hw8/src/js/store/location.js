import api from '../services/apiService';
import {
    formatDate
} from '../helpers/date';

class Location {
    constructor(api, helpers) {
        this.api = api;
        this.countries = null;
        this.cities = null;
        this.shortCitiesList = null;
        this.airlines = null;
        this.lastSearch = {};
        this.formatDate = helpers.formatDate;
        this.favoriteTickets = [];
    }

    async init() {
        const response = await Promise.all([
            this.api.countries(),
            this.api.cities(),
            this.api.airlines(),
        ]);
        const [countries, cities, airlines] = response;
        this.countries = this.serializeCountries(countries);
        this.cities = this.serializeCities(cities);
        this.shortCitiesList = this.createShortCitiesList(this.cities);
        this.airlines = this.serializeAirlines(airlines);
        return response;
    }

    getCityCodeByKey(key) {
        const city = Object.values(this.cities).find((item) => item.fullname === key);
        return city.code;
    }
    getCityNameByCode(code) {
        return this.cities[code].name;
    }

    createShortCitiesList(cities) {
        return Object.entries(cities).reduce((acc, [, city]) => {
            acc[city.fullname] = null;
            return acc;
        }, {});
    }

    serializeCountries(countries) {
        return countries.reduce((acc, country) => {
            acc[country.code] = country;
            return acc;
        }, {});
    }

    serializeCities(cities) {
        return cities.reduce((acc, city) => {
            const countryName = this.countries[city.country_code].name;
            const cityName = city.name || city.name_translations.en;
            const fullname = `${cityName},${countryName}`;
            acc[city.code] = {
                ...city,
                countryName,
                fullname
            };
            return acc;
        }, {});
    }

    serializeAirlines(airlines) {
        return airlines.reduce((acc, item) => {
            item.logo = `http://pics.avs.io/200/200/${item.code}.png`;
            item.name = item.name || item.name_translations.en;
            acc[item.code] = item;
            return acc;
        });
    }

    getAirlineByCode(code) {
        return this.airlines[code] ? this.airlines[code].name : '';
    }

    getAirlineLogo(code) {
        return this.airlines[code] ? this.airlines[code].logo : '';
    }

    async fetchTickets(params) {
        const response = await this.api.prices(params);
        this.lastSearch = this.serializeTickets(response.data);
    }

    serializeTickets(tickets) {
        return Object.values(tickets).map((ticket) => {
            return {
                ...ticket,
                origin_name: this.getCityNameByCode(ticket.origin),
                destination_name: this.getCityNameByCode(ticket.destination),
                airline_name: this.getAirlineByCode(ticket.airline),
                airline_logo: this.getAirlineLogo(ticket.airline),
                departure_at: this.formatDate(ticket.departure_at, 'dd MM yyyy hh:mm'),
                return_at: this.formatDate(ticket.return_at, 'dd MM yyyy hh:mm'),
            };
        });
    }

    serializeFavoriteTickets(index) {

        this.favoriteTickets.push(this.lastSearch[index]);
        console.log(this.favoriteTickets);
        return this.favoriteTickets;
    }

    deleteFavoriteTicket(index) {
        this.favoriteTickets.splice(index, 1);
        return this.favoriteTickets;
    }

}

const locations = new Location(api, {
    formatDate
});
export default locations;