let Category = require ("../models/categoryModels")

let categoryController =async(req,res)=>{
    let {name,description} = req.body  

    
  let existingCategory = await Category.findOne({name:name.toLowerCase()})
  if (existingCategory != null) {
    return res.send("This category already exists")
  }

  let category = new Category({
    name:name.toLowerCase(),
    description:description
  })

  category.save()
  res.send("category created successfully")
}
module.exports = categoryController