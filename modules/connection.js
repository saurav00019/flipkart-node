const mongoose= require('mongoose');

const conn= mongoose.createConnection("mongodb://localhost:27017/Flipkart", )

if (conn) {
    console.log("connection successfully");
} else {
    console.log("something went wrong");
}

exports.mongoose= mongoose;
exports.conn= conn;