const express = require('express'),
mongoose=require('mongoose'),
bodyParser = require('body-parser'),
controller =  require('./src/controllers/weatherController'),
jwt =  require('./src/helpers/jwt');
let request = require('request');
let server = express();

// parse requests of content-type - application/x-www-form-urlencoded
server.use(bodyParser.urlencoded({ extended: true }));
// parse requests of content-type - application/json
server.use(bodyParser.json());
server.use(jwt());

//App start
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});


// connect to database
mongoose.connect('mongodb://127.0.0.1/weathermap', { useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
  console.log(`MongoDB connected!`);
});

// api :/weather

server.get('/weather', (req, res) => {
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${req.query.city}&appid=${req.query.apiKey}`;
  request(url, function (err, response, body) {
    if(err){
      
      console.log("Failed to get Data from API- getting data from store");
      var r=  controller.getWeatherInfo();
      r.then( function(r1){
        res.setHeader('Content-Type', 'application/json');
        res.end(r1);
      })
    
    } else {
       controller.saveWeatherInfo(body);
       res.setHeader('Content-Type', 'application/json');
       res.end(body);
    }
  });
});
  
 

server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });

  // server.get('/weather', (req, res) => {
  //   request(url, function (err, response, body) {
  //           if(err){
  //               reject(error)
  //           } else {
  //               console.log(body);
  //               res.setHeader('Content-Type', 'application/json');
  //               res.end(body);
  //               res.status(200).send(response)
  //           }
  //         });
  // });

  server.get('/auth', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(controller.authenticate(req.headers.username,req.headers.password)));
  })




  
//  // handler for error 400
//   app.use((req, res, next) => {
//     res.status(404).send('404 error The page resource was not found!')
//   })
