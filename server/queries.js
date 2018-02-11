const promise = require('bluebird');

const options = {
  promiseLib: promise
};

const pgp = require('pg-promise')(options);
const connectionString = 'postgres://localhost:5432/mydb';
const db = pgp(connectionString);

function getLocationByName(req, res, next) {
  const locationName = req.params.name;
  db.one('SELECT * FROM locations WHERE LOWER(name) = LOWER($1)', locationName)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved location'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getAllTemperaturesByLocation(req, res, next) {
  const locationName = req.params.name;
  db.any('SELECT * FROM temperatures WHERE LOWER(location) = LOWER($1)', locationName)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved all temperatures'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function postTemperatureByLocation(req, res, next) {
  let unixTimeStamp = Math.floor(Date.now()/1000); //convert millis to seconds
  db.none('insert into temperatures(location, temperature, timestamp)'
   + 'values(${location}, ${temperature}, to_timestamp(' + unixTimeStamp + '))',
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted temperature value'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

module.exports = {
	getAllTemperaturesByLocation: getAllTemperaturesByLocation,
	getLocationByName: getLocationByName,
	postTemperatureByLocation: postTemperatureByLocation
};
