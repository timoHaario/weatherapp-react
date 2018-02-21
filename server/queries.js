const promise = require('bluebird');

const options = {promiseLib: promise};

const pgp = require('pg-promise')(options);
const connectionString = 'postgres://localhost:5432/mydb';
const db = pgp(connectionString);

/*
INSERT INTO locations VALUES ('Tokyo', '35.6584421,139.7328635');
INSERT INTO locations VALUES ('Helsinki','60.1697530,24.9490830');
INSERT INTO locations VALUES ('New York','40.7406905,-73.9938438');
INSERT INTO locations VALUES ('Amsterdam','52.3650691,4.9040238');
INSERT INTO locations VALUES ('Dubai','25.092535,55.1562243');
*/

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

module.exports = {
  getAllLocations: getAllLocations,
	getAllTemperaturesByLocation: getAllTemperaturesByLocation,
	postTemperatureByLocation: postTemperatureByLocation
};
