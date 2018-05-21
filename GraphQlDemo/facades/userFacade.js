var User = require('../models/user');

module.exports = {
    addUser: function (firstName, lastName, userName, password, jobsArray) {
        var jobs = [];
        if (typeof(jobsArray) !== "undefined") {
            for (var i = 0; i < jobsArray.length; i++) {
                jobs.push({
                    type: jobsArray[i].type,
                    company: jobsArray[i].company,
                    companyURL: jobsArray[i].companyURL
                });
            }
        }

        var user = { firstName, lastName, userName, password, job: jobs};
        var u = new User(user);
        return u.save();
    },


    getAllUsers: function () {
        var foundItems = new Promise((resolve, reject) => {
            User.find({}, (err, users) => {
                err ? reject(err) : resolve(users)
            })
        })
        return foundItems;
    },

    findByUserName: function (username) {
        var foundItems = new Promise((resolve, reject) => {
            User.findOne({ 'userName': username }, (err, user) => {
                err ? reject(err) : resolve(user)
            })
            /**
             *     User.findOne({ 'userName': usr }, (err, user) => {
        if (err) throw err;

    }
             */
        })
        return foundItems;
    }
}