const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const db = require('./queries');
const bodyParser = require('body-parser');
const path = require('path');

app.use(express.static(path.join(__dirname, '../client/build')));

app.use(bodyParser.json());

app.get('/api/location', db.getAllLocations);
app.get('/api/location/:name/temperatures', db.getAllTemperaturesByLocation)
app.post('/api/location/:name/temperatures', db.postTemperatureByLocation)
//datawipe for dev purposes
app.get('/api/dev/wipedata', db.clearAllTemperatures)

app.listen(port, () => console.log(`Listening on port ${port}`));
