const { response } = require("express");
var express= require("express");
var router= express.Router();
var controller= require("../controller/adminController")

/* GET users listing. */
router.post('/signup', async function(req, res, next) {
    try {
        let checkStatus = await controller.signup(req)
        if(checkStatus && checkStatus.status == -1)
        {
            throw new Error('SignUp failed')
        }
        else res.status(200).json({message: "admin signup successfully", response: checkStatus.response})
    }
    catch (error) {
        res.status(403).json({status_code: "403", message: error.message})
    }
  }); 

  


router.post('/login', async function(req, res, next) {
    try {
        let checkLogin= await controller.login(req)
        if(checkLogin && checkLogin.status == -1)
        {
            throw new Error("password is wrong")
        } if (checkLogin && checkLogin.status == -1) {
            throw new Error("Email ID is not registered with us")
        }
        else res.status(200).json({message: "Login successfully", response: checkLogin.response})
    }
    catch(error) {
        console.log("here is error for  ", error);
        res.status(403).json({status_code: "403", message: "Credentials don't match"})
    }
})


  
  router.get('/getAllcategory', async function(req, res, next) {
    try {
        let category= await controller.getAllcategory(req) 
        if (category && category.status == -1)
        {
            throw new Error("can not get category")
        } 
    else res.status(200).json({message: "Category get successfully", response: category.response})
        }
        catch(error) {
            res.status(403).json({status_code: "403", message: error.message})
        }
    })


    router.post('/addCategory', async function(req, res, next) {
        try {
            let category= await controller.addCategory(req)
            if  (category && category.status == -1)
            {
                throw new Error("can not addedd category")
            }
            else res.status(200).json({message: "category addedd successfully", response: category.response})
        }
        catch(error) {
            res.status(403).json({status_code: "403", message: error.message})
        }
    })


    router.put('/updateCategory', async function(req, res, next) {
        try {
            let category= await controller.updateCategory(req)
            if (category && category.status == -1)
            {
                throw new Error("Can not updated category")
            }
            else res.status(200).json({message: "Category updated successfully", response: category.response})
        }
        catch(error){
            res.status(403).json({status_code: "403", message: error.message})
        }
    })


    router.delete('/deleteCategory', async function(req, res, next) {
        try {
            let category= await controller.deleteCategory(req)
            if (category && category.status == -1)
            {
                throw new Error("can not delete category")
            }
            else res.status(200).json({message: "Category deleted successfully", response: category.response})
        }
        catch(error){
            res.status(403).json({status_code: "403", message: error.message})
        }
    })

    router.post('/blockUnblockCategory', async function(req, res, next) {
        try{
            let blockData= await controller.blockUnblockCategory(req)
            if (blockData.response.is_blocked == 0)
            {
                res.status(200).json({message: "category Unblocked successfully", response: blockData.response})
            }
            else if (blockData.response.is_blocked == 1) {
             res.status(200).json({message: "category blocked successfully", response: blockData.response})
            } else {
                res.status(403).json({err_msg: "is_blocked is wrong"})
            }
        }
        catch(error){
            res.status(403).json({status_code: "403", message: error.message})
        }
    })


    router.get('/getAllSubcategory', async function(req, res, next) {
        try {
            let subCategory= await controller.getAllSubcategory(req)
            if (subCategory && subCategory.status == -1)
            {
                throw new Error("Can not get subCategory list")
            }
            else res.status(200).json({message: "Get all subCategory list", response: subCategory.response})
        }
        catch(error) {
            res.status(403).json({status_code: "403", message: error.message})
        }
    })


    router.post('/addSubCategory', async function(req, res, next) {
        try {
            let subCategory= await controller.addSubCategory(req)
            if (subCategory && subCategory.status == -1)
            {
                throw Error("Can not added subCategory")
            }
             else res.status(200).json({message: "subCategory added successfully", response: subCategory.response})
        }
        catch(error) {
            res.status(403).json({status_code: "403", message: error.message})
        }
    })

    router.put('/updateSubCategory', async (req, res, next) =>{
        try {
            let subCategory= await controller.updateSubCategory(req)
            if (subCategory && subCategory.status == -1) {
                throw new Error("can not updated subCategory")
            }
            else res.status(200).json({message: "subCategory updated successfully", response: subCategory.response})
        }
        catch(error){
            res.status(403).json({status_code: "403", message: error.message})
        }
    })

    router.delete('/deleteSubCategory', async function(req, res, next) {
        try {
            let subCategory= await controller.deleteSubCategory(req)
            if (subCategory && subCategory.status == -1) {
                throw new Error("can not delete subCategory")
            }
            else res.status(200). json({message: "subCategory deleted successfully", response: subCategory.response})
        }
        catch(error) {
            res.status(403).json({status_code: "403", message: "something went wrong"})
        }
    })

    // =============================================================Profile updated=======================================================

    router.put('/updateProfile', async function(req, res, next) {
        try {
            let profile= await controller.updateProfile(req)
            console.log("here is profile data", profile);
            if(profile && profile.status == -1) {
                throw new Error("Profile can not be updated")
            }
            else res.status(200).json({message: "Profile updated successfully", response: profile.response})
        }
        catch(error) {
            console.log("here is problem", error );
            res.status(403).json({status_code: "403", message: error.message})
        }
    })

    
    

module.exports = router;
