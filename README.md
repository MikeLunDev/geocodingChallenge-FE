# Project Title

Front End of the coding challenge for Medwing.

# Project Description

Front end of the geocoding challenge for Medwing done with react. 
It displays on a Google Map Markers from a Db. It allows you to search for locations and to delete or edit previously created markers. <br>
I decided to have a front end approach leveraging on npm like [react-google-maps](https://www.npmjs.com/package/react-google-maps) and <br>
[react-places-autocomplete](https://www.npmjs.com/package/react-places-autocomplete) that allows smooth use Google Maps Api.
Back end repository [HERE](https://github.com/MikeLunDev/geocodingChallenge-BE)<br>
Live demo of the project [HERE](https://geocoding-markers-fe.herokuapp.com/)

## Running locally

**Clone the repository and install the dependencies:**

```sh
git clone https://github.com/MikeLunDev/geocodingChallenge-BE.git
cd geocodingChallenge-FE
npm i
```

**Run a mongo istance if you have mongo as a service:**

```sh
mongod
```

**Get Google Maps API Key:**
Create a new API key from the Google developer console, making sure that `Maps JavaScript API` has been enabled.
Copy that key into your `.env` file creating an ENV var with the name `REACT_APP_GOOGLE_KEY`. 
Create a second API key for the cdn making sure that `Places API` has been enabled.


**Create a .env file with:**

- REACT_APP_GOOGLE_KEY (necessary to display the map)


**Run the app:**

```sh
npm start
```

## Built With

* [create-react-app](https://github.com/facebook/create-react-app) - Boiler plate for ReactJs applications
* [react-google-maps](https://tomchentw.github.io/react-google-maps/) - Creates HOC component that wrap the map and allows to display Markers
* [react-places-autocomplete](https://www.npmjs.com/package/react-places-autocomplete) - Npm that allows autocomplete powered by google

## Author

[Michele Lunati](https://github.com/MikeLunDev)

