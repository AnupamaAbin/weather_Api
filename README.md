# WeatherApi

API to get the weather information of HK : GET / weather
Everytime the API is called, get data from:
    OpenWeatherMap: https://openweathermap.org/
    Then store it on a Database before returning the data.
If OpenWeatherMap is down, 
    you should get the data from DB.


---
## Requirements

For development, you will only need Node.js and a node global package, installed in your environement.

## Install

    $ git clone https://github.com/AnupamaAbin/weather_Api.git
    $ cd weather_Api
    $ npm install

## How to test Api

   1. http://localhost:5000/auth (Generate TOKEN)
   
      username : test
      password : test
      
   2. http://localhost:5000/weather?city=hongkong&apiKey=d09ae4e2e9ebf60d9a8eccc8cc1d56d8
   
      Authorization : Bearer TOKEN (Token should passed as header with name 'Authorization').

## Running the project

    $ npm start

## Simple build for production

    $ npm build
