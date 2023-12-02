const {mongoose, conn}= require("../modules/connection")

let profileSchema= new mongoose.Schema({

    name: {
        type: String,
        default: ""
    },
    image: {
        type: String,
        default: ""
    },
    created_on: {
        type: Number,
        default: new Date().getTime()
    }

})

exports.profileModel= conn.model("profileModel", profileSchema)