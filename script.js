// script.js
const publicKey = '3f755c4c6d18052ed620bd6ddd45a062';
const privateKey = '475834a74e33a2f3424dbae38ebb31c764b04161';
const ts = new Date().getTime().toString();
const hash = generateHash(ts, privateKey, publicKey);
const apiUrl = `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`;
// console.log(apiUrl);
// Function to generate the hash
function generateHash(ts, privateKey, publicKey) {
    const stringToHash = ts + privateKey + publicKey;
    return CryptoJS.MD5(stringToHash).toString();
}

// Function to fetch data from the Marvel API
function fetchData(url) {
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            return data.data.results;
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

// Function to render superheroes
function renderSuperheroes(superheroes) {
    const resultContainer = document.querySelector('.result-container');
    resultContainer.innerHTML = ''; // Clear the previous content

    superheroes.forEach(superhero => {
        const box = document.createElement('div');
        box.classList.add('box');

        const name = document.createElement('p');
        name.classList.add('box-name');
        name.textContent = superhero.name;

        const img = document.createElement('img');
        img.classList.add('box-img');
        img.src = `${superhero.thumbnail.path}.${superhero.thumbnail.extension}`;

        const moreDetailsButton = document.createElement('button');
        moreDetailsButton.textContent = 'More details';
        moreDetailsButton.classList.add('more-details-button');

        const favouriteButton = document.createElement('button');
        favouriteButton.textContent = 'Favourite';
        favouriteButton.classList.add('favourite-button');

        const buttonsContainer = document.createElement('div');
        buttonsContainer.classList.add('buttons');
        buttonsContainer.appendChild(moreDetailsButton);
        buttonsContainer.appendChild(favouriteButton);

        box.appendChild(img);
        box.appendChild(name);
        box.appendChild(buttonsContainer);

        resultContainer.appendChild(box);
    });
}

// Function to handle search
function handleSearch(event) {
    const searchValue = event.target.value.toLowerCase();
    console.log(searchValue);
    const filteredSuperheroes = superheroes.filter(superhero => superhero.name.toLowerCase().includes(searchValue));
    renderSuperheroes(filteredSuperheroes);
}

// Add event listener to the search input field
const searchInput = document.querySelector('.search');
searchInput.addEventListener('input', handleSearch);

// Initial fetch and render
let superheroes = [];
fetchData(apiUrl)
    .then(data => {
        superheroes = data;
        renderSuperheroes(superheroes);
    })