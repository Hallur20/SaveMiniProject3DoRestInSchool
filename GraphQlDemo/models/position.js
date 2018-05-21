var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const MINUTES = 2;
var EXPIRES = 60*MINUTES;
var PositionSchema = new Schema({
    user: {type: Schema.ObjectId, ref: 'User', required: true},
    created: {type: Date, expires: EXPIRES, default: Date.now},
    loc: {
        'type': {type: String, enum: "Point", default: "Point"},
        coordinates: {type: [Number]}
    },
    radius: {type: Number},
    cheatWithId: {type: String}
});

module.exports = mongoose.model("Position", PositionSchema);