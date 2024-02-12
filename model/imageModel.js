const {mongoose, conn}= require("../modules/connection")

let imageSchema= new mongoose.Schema({
    fileName: {
        type: String,
        default: ""
    },
    path: {
        type: String,
        default: ""
    },
    created_on: {
        type: Number,
        default: new Date().getTime()
    }
})