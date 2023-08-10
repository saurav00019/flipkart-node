const {mongoose, conn} = require("../modules/connection")

let categorySchema= new mongoose.Schema({

    category: {
        type: String,
        default: ""
    },
    name: {
        type: String,
        default: ""
    },
    type: {
        type: String,
        default: ""
    },
    cretaed_on: {
        type: Number,
        default: new Date().getTime()
    },
    image: {
        type: String,
        default: ""
    },
    is_blocked: {
        type: Number,
         default: 0
    }


})


exports.categoryModel= conn.model('category', categorySchema)