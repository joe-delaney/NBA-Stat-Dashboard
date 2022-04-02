//app.js
const express = require('express'); // web framework
const fetch = require('node-fetch'); // for making AJAX requests
const path = require('path');

// put environmental variables defined in .env file on process.env
require('dotenv').config();

const app = express();

// serve files / assets from the dist folder
app.use(express.static('dist'));

// // in response to `GET /` requests, send the file `dist/index.html`
app.get('/', (request, response) => {
    response.sendFile(`${__dirname}/dist/index.html`);
});

// Heroku sets process.env.PORT in production; use 8000 in dev
const PORT = process.env.PORT || 8000;
// start up a server listening at PORT; on success, log a message
app.listen(PORT, () => {
    console.log(`Listening at localhost:${PORT}`);
});

app.get('/search', (request, response) => {
    const urlStart = 'https://balldontlie.io/api/v1/players?';
    const searchTerm = request.query.searchTerm; // from query string
    const url = `${urlStart}search=${searchTerm}`;

    console.log(`Fetching: ${url}`);

    fetch(url) // AJAX request to API
        .then(apiResponse => apiResponse.json())
        .then(data => response.send(data))
        .catch(error => response.send(error));
});

app.get('/season-average', (request, response) => {
    const urlStart = 'https://balldontlie.io/api/v1/season_averages?';
    const season = request.query.season; // from query string
    const playerIds = JSON.parse(request.query.playerId); //from query string

    //Create playerIdString for url from playerIds passed in from front end
    let playerIdString = "";
    playerIds.forEach((id) => {
        playerIdString += `&player_ids[]=${id}`;
    })

    const url = `${urlStart}season=${season}${playerIdString}`;
    console.log(`Fetching: ${url}`);

    fetch(url) // AJAX request to API
        .then(apiResponse => apiResponse.json())
        .then(data => response.send(data))
        .catch(error => response.send(error));
});
