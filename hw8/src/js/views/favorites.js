import {
    getDropdownInstance
} from '../plugins/materialize';
import currencyUI from './currency';

class FavoritesUI {
    constructor(dropdownInstance, currency) {
        this.dropdown = document.getElementById('dropdown1');
        this.favoriteTicketsDropdown = dropdownInstance(this.dropdown);
        this.container = document.querySelector('.dropdown-content');
        this.currencySymbol = currency.getCurrencySymbol.bind(currency);
    }

    get favoriteTicketsContainer() {
        return this.container;
    }

    renderFavoriteTickets(favorireTickets) {
        this.clearContainer();

        let fragment = '';
        const currency = this.currencySymbol();
        favorireTickets.forEach(favorireTicket => {
            const template = FavoritesUI.favoriteTicketsTemplate(favorireTicket, currency);
            fragment += template;
        });
        this.container.insertAdjacentHTML('afterbegin', fragment);
    }
    clearContainer() {
        this.container.innerHTML = '';
    }

    static favoriteTicketsTemplate(favorireTicket, currency) {
        return `        
            <div class="favorite-item  d-flex align-items-start">
                <img src="${favorireTicket.airline_logo}"
                     class="favorite-item-airline-img"
                 />
                <div class="favorite-item-info d-flex flex-column">
                    <div class="favorite-item-destination d-flex align-items-center">
                        <div class="d-flex align-items-center mr-auto">
                            <span class="favorite-item-city">${favorireTicket.origin_name}</span>
                            <i class="medium material-icons">flight_takeoff</i>
                        </div>
                        <div class="d-flex align-items-center">
                            <i class="medium material-icons">flight_land</i>
                            <span class="favorite-item-city">${favorireTicket.destination_name}</span>
                        </div>
                    </div>
                    <div class="ticket-time-price d-flex align-items-center">
                        <span class="ticket-time-departure">${favorireTicket.departure_at}</span>
                        <span class="ticket-price ml-auto">${currency}${favorireTicket.price}</span>
                    </div>
                    <div class="ticket-additional-info">
                        <span class="ticket-transfers">Пересадок: ${favorireTicket.transfers}</span>
                        <span class="ticket-flight-number">Номер рейса: ${favorireTicket.flight_number}</span>
                    </div>
                    <a class="waves-effect waves-light btn-small pink darken-3 delete-favorite ml-auto">Delete</a>
                </div>
            </div>
        `;
    }

}

const favoritesUI = new FavoritesUI(getDropdownInstance, currencyUI);
export default favoritesUI;