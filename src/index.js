import './css/styles.css';
import { fetchCounter } from './fetchCountries';
import Notiflix from 'notiflix';
var debounce = require('lodash.debounce');

const input = document.querySelector('#search-box');
const list = document.querySelector('.country-list');
const info = document.querySelector('.country-info');
const DEBOUNCE_DELAY = 300;

input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(evt) {
    evt.preventDefault();
    const name = evt.target.value.trim();

    if (!name) {
        clear();
        return
    }

    fetchCounter(name)
        .then(data => {
            if (data.length > 10) {
                clear();
                Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
            }
            if (data.length === 1) {
                clear();
                creatMarkupItem(data);
            }
            if (data.length >= 2 && data.length <= 10) {
                clear();
                creatMarkupList(data);
            }
            
        })
        .catch(err => {
            clear();
            Notiflix.Notify.failure("Oops, there is no country with that name");
        });
}

function creatMarkupList(arr) {
    const markup = arr.map(({name, flags}) => {
        return `
        <li class="country-item">
            <img src="${flags.svg}" alt="${name.common}" width="30">
            <h2 class="country-titel"> ${name.official}</h2>
        </li>
        `}).join('');
    list.innerHTML = markup
}

function creatMarkupItem(arr) {
    const markup = arr.map(({ name, capital, population, languages, flags}) => {
        return `
            <img src="${flags.svg}" alt="${name.common}" width="30">
            <h2 class="country-titel">${name.official}</h2>
            <p><b>Capital:</b> ${capital}</p>
            <p><b>Population:</b> ${population}</p>
            <p><b>Languages:</b> ${Object.values(languages)}</p>`
    }).join('');
    info.innerHTML = markup;
}
function clear() {
    list.innerHTML = '';
    info.innerHTML = '';
}