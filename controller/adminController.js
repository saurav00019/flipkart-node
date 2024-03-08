const {AdminModel}= require("../model/adminModel")
var jwt = require("jsonwebtoken")
const md5 = require("md5");
const { categoryModel } = require("../model/categoryModel");
const { subCategoryModel } = require("../model/subCategoryModel");
const { profileModel } = require("../model/profileModel");
const multer = require("multer");
const FormData = require('form-data');
const fs = require('fs');

exports.signup= async(req, res) =>{
        let {name, password, email, mobile_number, role}= req.body;
		req.body.password = md5(password)
        let admin= new AdminModel(req.body)
		let check_email= await AdminModel.findOne({email: email})
		if (!check_email) {
		
		AdminModel(req.body);
       let result = await admin.save();
        if(result) return ({message: "admin signup successfully", response: result,status:0})
        else return ({message: "signup failed", response: {},status:-1})
		}
		else return ({message: "email already exist", response: {}, status: -1})
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
	let blockData= await categoryModel.findOneAndUpdate({_id: _id}, {$set: {is_blocked}}, {new: true})
	// console.log(`here is detail of block and unblock data, ${is_blocked}` );
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
	 deleteData= await subCategoryModel.findByIdAndDelete(req.body._id) 

	if (deleteData) return ({message: "subCategory deleted Successfully", response: deleteData, status: 0})
	else return ({message: "subCategory not deleted", response: {}, status: -1})
}


// =============================================================profile Updated================================================================

exports.updateProfile= async(req, res) =>{
	
	let updatedData= {
		name: req.body.name,
		mobile_number: req.body.mobile_number,
		role: req.body.role,
		password: md5(req.body.password),
		_id: req.body._id
	}
	console.log(" here is profile id.....", updatedData._id);
	 editProfile= await AdminModel.findByIdAndUpdate({_id: updatedData._id}, updatedData, {new: true});
	 console.log(" here is profile id>>>>>>", updatedData._id);

	if (editProfile) return({message: "profile updated successfully", response: editProfile, status: 0})
	else return({message: "profile not updated", response: {}, status: -1})

}




// ========================================================== image upload ==========================================================



exports.uploadImage= async(req, res)=>{
	// const file = req.upload
	const file= fs.createReadStream("./myfile.jpg")
	const formdata= new FormData()
	// formdata.append('image', fs.createReadStream('path/to/profile_picture.jpg'))
	formdata.append('image', file)
	// body.set("file", uploadImg)
	console.log("here is proper image>>>>>>>>>>>>>", formdata);

	if(formdata) return ({message: "Image uploaded successfully", response: formdata, status: 0})
	else return({message: "image not uploaded", response: {}, status: -1})
}


exports.searchCategory= async(req, res) =>{
	let searchData= {
		_id: req.body._id
	}
	let fetchData= await categoryModel.findById(searchData._id)
	if (fetchData) {
		console.log("here is fond item", fetchData);
		 return({ message: "category fatched successfully", response: fetchData, status: 0})
	}
	else return({message: "category could't fatched", response: {}, status: -1})


}

exports.filterCategory= async(req, res) =>{

	let searchData= {
		category: req.body.category
	}
	let fetchData= await categoryModel.find({})
	let newData= []
	
	newData= fetchData.filter((item) => item.category === searchData.category).map((item) =>({
		        category: item.category,
				name: item.name,
				type: item.type,
				image: item.image,
				_id: item._id
	}))
	console.log("here is new data", newData);
	if (newData != 0) {
		return({ message: "category fatched successfully", response: newData, status: 0})
	}
	else {
	 return({message: "category could't fatched", response: {}, status: -1})
	}
}


exports.blockUnblockSubCategory= async(req, res, next) =>{
	var{_id, is_blocked}= req.body

	let blockData= await subCategoryModel.findOneAndUpdate({_id: _id}, {$set: {is_blocked}}, {new: true})

	if (is_blocked == 0) {
		return ({message: "Sub category unBloked successfully", response: blockData})
	}
	else return ({message: "Sub category Blocked succeessfully", response: blockData})
}

