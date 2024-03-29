const {mongoose, conn}= require("../modules/connection")

let subCategorySchema= new mongoose.Schema({
    
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
    },
    is_blocked: {
        type: Number,
        default: 0
    },
    categoryId: {
        type: mongoose.Schema.ObjectId,
        ref:'category'
    }

})

exports.subCategoryModel= conn.model("subCategory", subCategorySchema)