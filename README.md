# Weather app for climatologists

A simple weather app that lets you see and update temperature recordings in different locations. Currently supported locations are

```
Tokyo: 35.6584421,139.7328635
Helsinki: 60.1697530,24.9490830
New York: 40.7406905,-73.9938438
Amsterdam: 52.3650691,4.9040238
Dubai: 25.092535,55.1562243
```

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development.

### Prerequisites

You need to have PostreSQL up and running, port and the name of the database can be changed in queries.js (defaults to :5432 and mydb).
You also need to have Yarn installed.

### Installing

Clone the repository and cd into the weatherapp-react folder and run

```
yarn postinstall
```

after you can start the application locally by running

```
yarn start
```


## Deployment

This project can be easily deployed in Heroku, you just need to add a PostgreSQL addon in the project settings.
One running application can be found here (auto deploys from this project's dev branch):

```
https://weather-heroku-test.herokuapp.com/
```

## Authors

* **Timo Haario**

## Acknowledgments

* Hat tip to anyone who reads this
  