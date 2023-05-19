import {addpatient, deleteMypatient, getAllpatient, getMypatient, searpatient, updateMypatient} from "../controller/patient.controller.js"
import {login, register} from "../controller/user.controller.js"
import verifyUser from '../middleware/auth.middleware.js'
import express from 'express'
const router = express.Router();



    router.post('/register', register)  //route for register existing user

    router.post('/login', login)  //route for login

    router.post('/addpatient',addpatient) // for adding patient

    router.get('/getMypatient/:userId',getMypatient) // for user patient

    router.delete('/deleteMypatient/:_id',  deleteMypatient) // delete patient
   
    router.put('/updateMypatient/:_id',  updateMypatient) // update patient

    router.get('/search/:tags', searpatient)  // serch patient

    router.get("/getAllpatient",getAllpatient)



// export default routes;
export default router;
