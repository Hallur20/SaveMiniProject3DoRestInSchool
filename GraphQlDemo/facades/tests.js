var userFacade = require("./userFacade");
var locationBlogFacade = require('./locationBlogFacade');
var loginFacade = require('./phoneLoginFacade');
var mongoose = require('mongoose');

var db = mongoose.connection;
db.on('error', () => { console.log('---FAILED to connect to mongoose') })
db.once('open', () => {
    console.log('+++Connected to mongoose')
})
mongoose.connect('mongodb://hallur:12345@ds119969.mlab.com:19969/miniproject');
/*
Latitude: 55°23′09″N   55.3858067
Longitude: 13°00′13″E   13.00351035
Distance: 35.4391 km  Bearing: 134.75°

*/
locationBlogFacade.addPositionWithPhone(12.98992169,55.88281719,"5ab3a9b1b7e51907d4168863", 3);//test position 1
locationBlogFacade.addPositionWithPhone(12.65547316,55.77942908,"5ab3a9b1b7e51907d4168866", 2);//test position 2
locationBlogFacade.addPositionWithPhone(12.65547316,55.87392256,"5ab3a9b1b7e51907d4168869", 4);//test position 3
locationBlogFacade.addPositionWithPhone(12.81811106,55.76375822,"5ab3a9b1b7e51907d416886f", 4);//test position 3
locationBlogFacade.addPositionWithPhone(12.20901889,55.45021633,"5ab7d3e4d9c3a33b987ba36e", 4);//test position 3
locationBlogFacade.addPositionWithPhone(11.78179531,55.5508708,"5ab7d6551213c33fb8ff4164", 4);//test position 3
locationBlogFacade.addPositionWithPhone(12.71146034,55.15614532,"5ab7d716e3f7833bc4c07b59", 4);//test position 3
locationBlogFacade.addPositionWithPhone(13.00351035,55.3858067,"5ab7d8677a082237f8dea055", 4);//test position 3
loginFacade.doAll("hvn20","123",3, 12.1, 32.1); //login with phone test