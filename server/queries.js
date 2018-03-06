const promise = require('bluebird');

const options = {promiseLib: promise};

const pgp = require('pg-promise')(options);
const connectionString = (process.env.DATABASE_URL ? process.env.DATABASE_URL + '?ssl=true' : 'postgres://localhost:5432/mydb');

const db = pgp(connectionString);

function getAllLocations(req, res, next) {
  db.any('SELECT * FROM locations')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved all locations'
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
  let unixTimeStamp = Date.now();
  db.none('insert into temperatures(location, temperature, timestamp)'
   + 'values(${location}, ${temperature}, ' + unixTimeStamp + ')',
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

function clearAllTemperatures(req, res, next) {
  db.none('delete from temperatures')
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Cleared all temperature data'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

module.exports = {
  clearAllTemperatures: clearAllTemperatures,
  getAllLocations: getAllLocations,
	getAllTemperaturesByLocation: getAllTemperaturesByLocation,
	postTemperatureByLocation: postTemperatureByLocation
};
