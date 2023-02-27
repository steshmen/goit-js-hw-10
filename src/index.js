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
        list.innerHTML = '';
        info.innerHTML = '';
        return
    }

    fetchCounter(name)
        .then(data => {
            if (data.length > 10) {
                Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
            }
            if (data.length === 1) {
                onMarkupItem(data);
                list.innerHTML = '';
            }
            if (data.length >= 2 && data.length <= 10) {
                onMarkupList(data);
                info.innerHTML = '';
            }
            
        })
        .catch(err => {
            Notiflix.Notify.failure("Oops, there is no country with that name");
        });
}

function onMarkupList(arr) {
    const markup = arr.map(({name, flag}) => {
        return `
        <li>
            <h2>${flag} ${name.common}</h2>
        </li>
        `}).join('');
    list.innerHTML = markup
}

function onMarkupItem(arr) {
    const markup = arr.map(({ name, capital, population, languages, flag}) => {
        return `
            <h2><span>${flag}</span> ${name.common}</h2>
            <p><b>Capital:</b> ${capital}</p>
            <p><b>Population:</b> ${population}</p>
            <p><b>Languages:</b> ${Object.values(languages)}</p>`
    }).join('');
    info.innerHTML = markup;
}

