const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

const db = require('./queries');

const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.get('/api/location/:name', db.getLocationByName);
app.get('/api/location/:name/temperatures', db.getAllTemperaturesByLocation)
app.post('/api/location/:name/temperatures', db.postTemperatureByLocation)

app.listen(port, () => console.log(`Listening on port ${port}`));
