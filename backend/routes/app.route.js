import {addBlog, deleteMyBlog, getAllBlog, getMyBlog, searBlog, updateMyBlog} from "../controller/blog.controller.js"
import {login, register} from "../controller/user.controller.js"
import verifyUser from '../middleware/auth.middleware.js'
import express from 'express'
const router = express.Router();



    router.post('/register', register)  //route for register existing user

    router.post('/login', login)  //route for login

    router.post('/addBlog',addBlog) // for adding blog

    router.get('/getMyBlog/:userId',getMyBlog) // for user blogs

    router.delete('/deleteMyBlog/:_id',  deleteMyBlog) // delete blogs
   
    router.put('/updateMyBlog/:_id',  updateMyBlog) // update blogs

    router.get('/search/:tags', searBlog)  // serch blogs

    router.get("/getAllBlog",getAllBlog)



// export default routes;
export default router;
