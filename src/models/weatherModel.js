
var mongoose = require('mongoose');
//Define a schema
var Schema = mongoose.Schema;

var weatherSchema = new Schema({
  weather_info:  {type: String},
  createdDate: {type: Date, "default": Date.now}
});

module.exports = mongoose.model('Weather', weatherSchema);

