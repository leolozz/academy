// const { MongoClient } = require("mongodb");
// const connectionString = process.env.ATLAS_URI;
// const client = new MongoClient(connectionString, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });

// let dbConnection;

// module.exports = {
//     connectToServer: function(callback) {
//         client.connect(function(err, db) {
//             if (err || !db) {
//                 return callback(err);
//             }

//             dbConnection = db.db("sample_airbnb");
//             console.log("Successfully connected to MongoDB.");

//             return callback();
//         });
//     },

//     getDb: function() {
//         return dbConnection;
//     },
// };
require('dotenv').config();

const mongoose = require('mongoose')

let dbConnection;

const connectToDatabase = async function() {
    mongoose.connect(process.env.DATABASE_URL)
        .then((res) => {
            console.log("Connected to database");
            dbConnection = res.Connection
        })
        .catch((err) => { console.error("Error on database connection", err); throw err })
}

const getDb = function() {
    return dbConnection
}

module.exports = { connectToDatabase, getDb }