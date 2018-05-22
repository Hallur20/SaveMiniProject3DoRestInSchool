var express = require('express');
var expressGraphQL = require('express-graphql');
const schema = require('./schema.js');
var bodyParser = require('body-parser');
var UserFacade = require('./facades/userFacade.js');
var LocationBlogFacade = require('./facades/locationBlogFacade.js');
var PhoneLoginFacade = require('./facades/phoneLoginFacade');
var User = require('./models/user.js');
var cors = require('cors')
var Position = require('./models/position');

const app = express();
app.set('view-engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use('/graphql', expressGraphQL({
    schema:schema,
    graphiql:true
}))

app.get('/express', (req, res) => {
    UserFacade.getAllUsers().then((users)=>{
        res.render('index.ejs', {users: users, status: ""});
    })
});

app.post('/login', (req, res) => {
    var usr = req.body.uName;
    var pswd = req.body.psw;
    UserFacade.findByUserName(usr).then((user)=>{
        if(user == null){
            res.send('user does not exist <a href="http://localhost:3000">go back</a>');
            return;
        }
        if (pswd == user.password) {
            res.render('login.ejs', {user: user, status : "false"});
        } else {
            res.send('user was correct, but password was wrong <a href="http://localhost:3000">go back</a>');
        }
    })
});

app.post('/login/createPosition', (req, res)=>{
    LocationBlogFacade.addPosition(req.body.lon, req.body.lat, req.body.id).then((data)=>{
        User.findOne({ '_id': req.body.id }, (err, user)=>{
            if(err) throw err;
            res.render("login.ejs", {user: user, status: "true", lon: ""+req.body.lon, lat: ""+req.body.lat});
        })
}
)}
);

app.post('/login/createLocationBlog', (req, res)=>{
    //info, author, lon, lat
    if(req.body.Binfo === ""){
        res.send("fail, info was empty");
        return;
    }
    LocationBlogFacade.addLocationBlog(req.body.Binfo, req.body.Bauthor, req.body.Blon, req.body.Blat).then((data)=>{
        res.send("success <a href='hallur.dk:3000'>click here to log out... your blog was created!</a>");
    });

})

app.get('/createTestData', (req,res)=>{
    var result = PhoneLoginFacade.makeTestData();
    res.send(result);
})

app.post('/create', (req, res) => {
    var getJobs = [];
    if (req.body.jobType1) {
        getJobs.push({ type: req.body.jobType1, company: req.body.jobCompany1, companyURL: req.body.jobCompanyUrl1 });
    }
    if (req.body.jobType2) {
        getJobs.push({ type: req.body.jobType2, company: req.body.jobCompany2, companyURL: req.body.jobCompanyUrl2 });
    }
    if (req.body.jobType3) {
        getJobs.push({ type: req.body.jobType3, company: req.body.jobCompany3, companyURL: req.body.jobCompanyUrl3 });
    }
    var fName = req.body.fName;
    var lName = req.body.lName;
    var uName = req.body.uName;
    var psw = req.body.psw;
    console.log(getJobs);
    UserFacade.addUser(fName, lName, uName, psw, getJobs).then((data)=>{
        UserFacade.getAllUsers().then((users)=>{
            console.log(data);
            res.render("index.ejs", {users: users, status : data});
        })
})
})

app.post('/phoneLogin', (req, res)=>{
    //res.send(req.body.passWord);
       User.find({}, (err, users) => {
            if (err) throw new Exception({msg: "wrong username or password", status: 403});
            for (var i = 0; i < users.length; i++) { //loop through users
                if (users[i].userName === req.body.userName && users[i].password === req.body.passWord) { //if user and its password exists
                    var id = users[i]._id;
                    //lon, lat, id
                    LocationBlogFacade.addPositionWithPhone(req.body.lon, req.body.lat, id, req.body.radius);
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
                        res.send(arr);
                        return;
                    })
                }
            }
        })
})
app.listen(8080, () => { console.log("server is running on port 8080"); });