import '../css/style.css';
import './plugins';
import location from './store/location';
import formUI from './views/form';
import ticketsUI from './views/tickets';
import currencyUI from './views/currency';
import favoritesUI from './views/favorites';

document.addEventListener('DOMContentLoaded', () => {
    initApp();
    const form = formUI.form;
    const allTickets = ticketsUI.ticketsContainer;
    const favoriteTickets = favoritesUI.favoriteTicketsContainer;

    async function initApp() {
        await location.init();
        formUI.setAutocompleteDate(location.shortCitiesList);
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        onFormSubmit();
    });

    allTickets.addEventListener('click', addToFavoriteTickets);
    favoriteTickets.addEventListener('click', deleteFavoriteTickets);

    async function onFormSubmit() {
        const origin = location.getCityCodeByKey(formUI.originValue);
        const destination = location.getCityCodeByKey(formUI.destinationValue);
        const depart_date = formUI.departDateValue;
        const return_date = formUI.returnValue;
        const currency = currencyUI.currencyValue;

        console.log(origin, destination, depart_date, return_date, currency);
        await location.fetchTickets({
            origin,
            destination,
            depart_date,
            return_date,
            currency,
        });
        ticketsUI.renderTickets(location.lastSearch);
    }

    function addToFavoriteTickets(e) {
        if (e.target.classList.contains("add-favorite")) {
            const addFavoriteBtn = document.getElementsByClassName('add-favorite');
            const index = Array.indexOf(addFavoriteBtn, e.target);
            location.serializeFavoriteTickets(index);
            favoritesUI.renderFavoriteTickets(location.favoriteTickets);
        }
    }

    function deleteFavoriteTickets(e) {
        if (e.target.classList.contains('delete-favorite')) {
            const delBtn = document.getElementsByClassName('delete-favorite');
            const index = Array.indexOf(delBtn, e.target);
            location.deleteFavoriteTicket(index);
            favoritesUI.renderFavoriteTickets(location.favoriteTickets);
        }
    }

});