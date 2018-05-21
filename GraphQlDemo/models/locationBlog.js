var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var LocationBlogSchema = new Schema({
    info: {type: String, required:true},
    //img : [string],
    pos: {
        longitude: {type: Number, required: true},
        latitude: {type: Number, required: true}
    },
    author: Schema.Types.ObjectId,
    likes: [Schema.Types.ObjectId],
    created: {type: Date, default: Date.now},
    lastUpdated : Date
});

LocationBlogSchema.virtual("slug").get(function(){ //slug = fancy word for a url
    return "/locationblog/"+this._id;
});
LocationBlogSchema.pre("save", function(next){
    this.lastUpdated = new Date();
    next();
});

module.exports = mongoose.model("LocationBlog", LocationBlogSchema);