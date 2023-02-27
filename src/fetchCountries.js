export function fetchCounter(name) {
    const BASE_URL = 'https://restcountries.com/v3.1/name/';
    
    return fetch(`${BASE_URL}${name}?fields=name,capital,population,flag,languages`)
        .then(resp => {
            if (!resp.ok) {
                throw new Error();
            }
            return resp.json();
        })
}