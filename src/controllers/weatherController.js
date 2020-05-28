let Weather = require('../models/weatherModel');

const jwt = require('jsonwebtoken');
const config = require('../helpers/env.config');
//dummy users : authentication
const users = [{ id: 1, username: 'test', password: 'test', firstName: 'Test', lastName: 'User' }];
//validuser
module.exports.authenticate = function (username, password) {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        const token = jwt.sign({ sub: user.id }, config.jwt_secret);
        const { ...userWithoutPassword } = user;
        return {
            ...userWithoutPassword,
            token
        };
    }
}

//save weather data
module.exports.saveWeatherInfo = function(weatherData, res) {

        var weather = new Weather({
            weather_info:weatherData
        });
        weather.save( (err, weather) => {  
            if(err) return res.status(500).send(err);
            return;
        });

};

//retrieve weather data

module.exports.getWeatherInfo = async function(){
 let res= await Weather.find().sort({"createdDate": -1}).limit(1).then(function(results) {
    console.log(results.length);     
    if(results!=null && results.length>0){        
       return  results[0].weather_info;
     }else{
         return '{"msg":"Data not available"}';
     }
 });
 return res;
}

