const {AdminModel}= require("../model/adminModel")
var jwt = require("jsonwebtoken")
const md5 = require("md5");
const { categoryModel } = require("../model/categoryModel");
const { subCategoryModel } = require("../model/subCategoryModel");

exports.signup= async(req, res) =>{
        let {name, password, email, mobile_number, role}= req.body;
		req.body.password = md5(password)
        let admin= new Admi
		
		
		nModel(req.body);
       let result = await admin.save();
        if(result) return ({message: "admin signup successfully", response: result,status:0})
        else return ({message: "signup failed", response: {},status:-1})
}


exports.login = async (req, res) => {
		let { password, email } = req.body;
		email = email.toLowerCase()
		let check_credentials = await AdminModel.findOne({ email: email })
		if (check_credentials) {
			if (check_credentials && check_credentials.password == md5(password)) {
				let token = jwt.sign({ email }, 'ravan')
				let updateData = {
					created_on: new Date().getTime(), access_token: token
				}

				let update_admin = await AdminModel.findOneAndUpdate({ email: check_credentials.email }, { $set: updateData }, { new: true })
                if (update_admin) return ({message: "Login successfully", response: update_admin, status: 0})
                else return ({message: "login failed", response: {}, status: -1})
			}
		}
	}

exports.getAllcategory= async(req, res) =>{
	saveCategory= await categoryModel.find({})
	if(saveCategory) return ({message: "Category list", response: saveCategory, status: 0})
	else return ({message: "Not able to get category list", response: {}, status: -1})
}


exports.addCategory= async(req, res) =>{
	let saveData= {
		name: req.body.name,
		image: req.body.image,
		created_on: new Date().getTime(),
		type: req.body.type,
        category: req.body.category,
	}
	savedCategory= await categoryModel.create(saveData)

	if(savedCategory) return ({message: "Category added successfully", response: savedCategory, status: 0})
	else return ({message: "Not able to add category", response:{}, status: -1})
}


exports.updateCategory= async(req, res) =>{
	let saveData= {
		category: req.body.category,
		name: req.body.name,
		image: req.body.image,
		type: req.body.type,
        _id:req.body._id
	}
	savedCategory= await categoryModel.findByIdAndUpdate({_id:saveData._id},saveData,{new: true});

	if (savedCategory) return ({message: "Category updated successfully", response: savedCategory, status: 0})
	else return ({message: "Category not updated", response: {}, status: -1})
}


exports.deleteCategory= async(req, res) =>{
	saveCategory= await categoryModel.findByIdAndDelete(req.body._id)

	if (saveCategory) return ({message: "Category deleted successfully",response: saveCategory, status: 0})
	else return ({message: "Category not deleted", response: {}, status: -1})
}


exports.blockUnblockCategory= async(req, res)=>{
	var {_id, is_blocked}= req.body
	blockData= await categoryModel.findOneAndUpdate({_id: _id}, {$set: {is_blocked}}, {new: true})
	if (is_blocked == 1) {
		return({message: "Category blocked successfully", response: blockData})
	} else {
		return({message: "Category unblocked successfully", response: blockData})
	}
}


exports.getAllSubcategory= async(req, res) =>{
	let saveData= await subCategoryModel.find({});

	if (saveData) return ({message: "Category list get successfully", response: saveData, status: 0})
	else return ({message: "Category list not get", response: {}, status: -1})
}

exports.addSubCategory= async(req, res) =>{
    let saveData= {
        name: req.body.name,
        image: req.body.image,
        created_on: new Date().getTime(),
        type: req.body.type,
        categoryId: req.body.categoryId
    }
    savedSubcategory= await subCategoryModel.create(saveData)

    if (saveData) return ({message: "subCategory added successfully", response: savedSubcategory, status: 0})
    else return ({message: "Not able to add subCategory", response: {}, status: -1})
}

exports.updateSubCategory= async(req, res) =>{
	let updateData= {
		name: req.body.name,
		image: req.body.image,
		_id: req.body._id
	}
	editSubCategory= await subCategoryModel.findByIdAndUpdate({_id: updateData._id}, updateData, {new: true});

	if (updateData) return({message: "subCategory updated successfully", response: updateData, status: 0})
	else return({message: "subCategory not updated", response: {}, status: -1})
}

exports.deleteSubCategory= async(req, res) =>{
	let deleteData= await subCategoryModel.findByIdAndDelete(req.body._id) 

	if (deleteData) return ({message: "subCategory deleted Successfully", response: message, status: 0})
	else return ({message: "subCategory list not get", response: {}, status: -1})
}