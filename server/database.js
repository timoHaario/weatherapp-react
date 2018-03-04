const promise = require('bluebird');

const options = {promiseLib: promise};

const pgp = require('pg-promise')(options);
const connectionString = 'postgres://pplccyvfwxhbnu:e7bc07baa7085228b68baf7545a1a1f2e1237f6f64a9a6cae1fe648667967b06@ec2-79-125-110-209.eu-west-1.compute.amazonaws.com:5432/d5arevqadlv43t' || 'postgres://localhost:5432/mydb';
const db = pgp(connectionString);

function createTemperatureTable() {
  db.none('CREATE TABLE temperatures ( location varchar(80), temperature real, timestamp varchar(80))')
    .then(() => {
        return;
    })
    .catch(error => {
        console.log(error);
    });
}

function createLocationsTable() {
  db.none('CREATE TABLE locations ( name varchar(80), coordinates point )')
    .then(() => {
       insertLocations();
    })
    .catch(error => {
        console.log(error);
    });
}

function insertLocations() {
	db.none('INSERT INTO locations VALUES (\'Tokyo\', \'35.6584421,139.7328635\')').then(() => {return});
	db.none('INSERT INTO locations VALUES (\'Helsinki\',\'60.1697530,24.9490830\')').then(() => {return});
	db.none('INSERT INTO locations VALUES (\'New York\',\'40.7406905,-73.9938438\')').then(() => {return});
	db.none('INSERT INTO locations VALUES (\'Amsterdam\',\'52.3650691,4.9040238\')').then(() => {return});
	db.none('INSERT INTO locations VALUES (\'Dubai\',\'25.092535,55.1562243\')').then(() => {return});
}

function createTables() {
	createLocationsTable();
	createTemperatureTable();
}

createTables();
