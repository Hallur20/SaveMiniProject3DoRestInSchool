var mongoose = require("mongoose");

var Schema = mongoose.Schema;


var JobSchema = new Schema({
    type: String,
    company: String,
    companyUrl: String
});
var UserSchema = new Schema({
    firstName: String,
    lastName: String,
    userName: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    job: [JobSchema],//embedded data, user can have many jobs so it's a list with jobs
    //email: {type: String, required: true},
    created: { type: Date, default: Date.now },
    lastUpdates: Date
});

module.exports = mongoose.model("User", UserSchema);