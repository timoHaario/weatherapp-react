const promise = require('bluebird');

const options = {promiseLib: promise};

const pgp = require('pg-promise')(options);
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/mydb';
const db = pgp(connectionString);

console.log("ConnectionString: ");
console.log(connectionString);

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
