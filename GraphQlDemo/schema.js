const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
    GraphQLInputObjectType
} = require('graphql');
var UserFacade = require("./facades/userFacade.js");
var LocationBlogFacade = require("./facades/locationBlogFacade.js");
var mongoose = require("mongoose");
var User = require("./models/user.js");
var LocationBlog = require("./models/locationBlog.js");
var db = mongoose.connection;
db.on('error', () => { console.log('---FAILED to connect to mongoose') })
db.once('open', () => {
    console.log('+++Connected to mongoose')
})
mongoose.connect('mongodb://hallur:12345@ds119969.mlab.com:19969/miniproject');
//Customer Type

const jobType = new GraphQLObjectType({
    name: 'Jobs',
    fields: () => ({
        type: { type: GraphQLString },
        company: { type: GraphQLString },
        companyUrl: { type: GraphQLString }

    })
})

const CustomerType = new GraphQLObjectType({
    name: 'Customer',
    fields: () => ({
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        userName: { type: GraphQLString },
        password: { type: GraphQLString },
        job: { type: new GraphQLList(jobType) },
        created: { type: GraphQLString },
        lastUpdates: { type: GraphQLString }
    })
})

const LocationBlogType = new GraphQLObjectType({
    name: 'LocationBlog',
    fields: () => ({
        info: {type: GraphQLString},
        img: {type: new GraphQLList(GraphQLString)},
        pos: {type: GraphQLString,type: GraphQLString},
        author: {type: GraphQLString},
        likes: {type: new GraphQLList(GraphQLString)},
        created: {type: GraphQLString},
        lastUpdates: {type: GraphQLString}
    })
})

//Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        customerUserName: {
            type: CustomerType,
            args: {
                userName: { type: GraphQLString }
            },
            resolve(parentValue, args) {
                return UserFacade.findByUserName(args.userName);
            }
        },
        customers: {
            type: new GraphQLList(CustomerType),
            resolve(parentValue, args) {
                return UserFacade.getAllUsers();
            }
        },
        locationBlogs: {
            type: new GraphQLList(LocationBlogType),
            resolve(parentValue, args){
                return LocationBlogFacade.getAllPositionBlogs();
            }
        }
    }

});



// Mutations
const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: CustomerType,
            args: {
                firstName: { type: new GraphQLNonNull(GraphQLString) },
                lastName: { type: new GraphQLNonNull(GraphQLString) },
                userName: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLString) },
                created: { type:(GraphQLString) },
                lastUpdates: { type: (GraphQLString) }
            },
            resolve(parentValue, args) {
                return UserFacade.addUser(args.firstName, args.lastName, args.userName, args.password,/* jobsArray*/);  
            }
        }
    }
})
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
});