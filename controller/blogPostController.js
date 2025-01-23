let Blog = require ("../models/blogModel")
const message = require("./message")

let blogPostController = (req,res)=>{
   // console.log("req.file",req.file.path)

     const {tittle,description,image,postedBy} = req.body

     let blog = new Blog({
        tittle: tittle,
        description:description,
        image: req.file.path,
        postedBy:postedBy
     })
     blog.save()
     res.send({message:"blog post successfully"})
}

module.exports = blogPostController