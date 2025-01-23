require('dotenv').config();
const express = require('express');
const app = express();
const dbConnection = require('./helper/dbConnection');

const secureApi = require('./middleware/secureApi');
const message = require('./controller/message');
const profile = require('./controller/profile');
const registrationController = require('./controller/registrationController');
const loginController = require('./controller/loginController');
const emailVerificationController = require('./controller/emailVerificationController');
const blogPostController = require('./controller/blogPostController');
const getAllBlogController = require('./controller/getAllBlogController');
const multer  = require('multer')
const path = require('path');
const categoryController = require('./controller/categoryController');
const categoryDeleteController = require('./controller/categoryDeleteController');
const categoryEditController = require('./controller/categoryEditController');


app.use(express.json());
dbConnection();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    }, 
    filename: function (req, file, cb) {
      console.log(file)
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniqueSuffix  + '-' + file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })


app.post('/message', secureApi, message);
app.post('/profile', secureApi, profile);
app.post('/registration', secureApi, registrationController);
app.post('/login', secureApi, loginController);
app.post('/blog_post',upload.single('avatar'), blogPostController);
app.post('/category', secureApi, categoryController);
app.post('/categoryedit', secureApi, categoryEditController);
app.get('/blog_post', getAllBlogController);

app.get('/:email', emailVerificationController);
app.delete('/categorydelete/:id',secureApi,categoryDeleteController);




app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
