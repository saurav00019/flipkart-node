const {mongoose, conn}= require("../modules/connection")

let adminSchema= new mongoose.Schema({

    name: {
        type: String,
        default: ""
    },
    mobile_number: {
        type: Number,
        default: ""
    },
    role: {
        type: String,
        default: ""
    },
    password: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        default: ""
    }

})

exports.AdminModel= conn.model('admin', adminSchema)