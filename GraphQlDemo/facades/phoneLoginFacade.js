var User = require('../models/user');
var locationBlogFacade = require('./locationBlogFacade');
var Position = require('../models/position');
module.exports = {
    doAll: function (name, psw, distance, lon, lat) {
        //first check username and password is correct
        User.find({}, (err, users) => {
            if (err) throw new Exception({msg: "wrong username or password", status: 403});
            for (var i = 0; i < users.length; i++) { //loop through users
                if (users[i].userName === name && users[i].password === psw) { //if user and its password exists
                    var id = users[i]._id;
                    //lon, lat, id
                    locationBlogFacade.addPositionWithPhone(lon, lat, id, distance);
                    Position.find({ _id: { $ne: id } }, (err, positions) => {
                        if (err) throw err;
                        var arr = { friends: positions };
                        var mapped = arr.friends.map((friend)=>{
                            var username;
                            for(var i = 0; i < users.length; i++){
                                if(JSON.stringify(friend.user) === JSON.stringify(users[i]._id)){ //works only if objects are converted to json strings...
                                    username = users[i].userName;
                                }
                            }
                            return {"username": username, "latitude":friend.loc.coordinates[1], "longitude":friend.loc.coordinates[0]};
                        });
                        arr = {friends: mapped};
                        console.log(arr);
                        return;
                    })
                }
            }
        })

        //then if it is correct create a post request with all users using the app
    },
    makeTestData : function(){
        locationBlogFacade.addPositionWithPhone(12.98992169,55.88281719,"5ab3a9b1b7e51907d4168863", 3);//test position 1
locationBlogFacade.addPositionWithPhone(12.65547316,55.77942908,"5ab3a9b1b7e51907d4168866", 2);//test position 2
locationBlogFacade.addPositionWithPhone(12.65547316,55.87392256,"5ab3a9b1b7e51907d4168869", 4);//test position 3
locationBlogFacade.addPositionWithPhone(12.81811106,55.76375822,"5ab3a9b1b7e51907d416886f", 4);//test position 3
locationBlogFacade.addPositionWithPhone(12.20901889,55.45021633,"5ab7d3e4d9c3a33b987ba36e", 4);//test position 3
locationBlogFacade.addPositionWithPhone(11.78179531,55.5508708,"5ab7d6551213c33fb8ff4164", 4);//test position 3
locationBlogFacade.addPositionWithPhone(12.71146034,55.15614532,"5ab7d716e3f7833bc4c07b59", 4);//test position 3
locationBlogFacade.addPositionWithPhone(13.00351035,55.3858067,"5ab7d8677a082237f8dea055", 4);//test position 3
//doAll("hvn20","123",3, 12.1, 32.1); //login with phone test
return "positions added!"
    }
}