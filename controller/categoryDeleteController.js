const Category = require ("../models/categoryModels")

let categoryDeleteController = async (req,res)=>{
    const {id} = req.params

    await Category.findByIdAndDelete(id)
    res.send("delete successful")
}

module.exports = categoryDeleteController