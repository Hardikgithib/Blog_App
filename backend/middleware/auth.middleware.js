//const jwt = require("jsonwebtoken"); //importing web token
import jwt from 'jsonwebtoken'
//const User = require("../model/user.schema"); //importing userSchema
import {User} from "../model/user.schema.js"
// fuction verifyuser authentication middleware
// const verifyUser = async (req, res, next) => {
//     console.log(req)
//         const token = req.headers('token')

//         if (!token) {
//             return res.status(401).send({
//                 'message': 'unauthorized, please login',
//                 'statusCode': 401
//             })
//         }

//         try {
//             const decode = jwt.verify(token, "productHub")

//             const user = await User.findOne({ _id: decode._id })

//             if (!user) {
//                 return res.status(400).send({
//                     'message': 'invalid token, please login',
//                     'statusCode': 400
//                 })
//             }

//             req.token = token
//             req.user = user

//             next()

//         } catch (e) {
//             return res.status(400).send({
//                 'message': 'something went wrong, please try again.',
//                 'statusCode': 400
//             })
//         }
// }

// const auth = async (req, res, next) => {
//   try {
//     const token = req.headers.authorization.split(" ")[1];

//     if (!token) {
//       return res.status(401).send({
//         message: "unauthorized, please login",
//         statusCode: 401,
//       });
//     }

//     jwt.verify(token, "Blogee")

//     next();

//   }
//   catch (err) {
//     res.status(403).send({
//       err: "Invalid jwt token",
//     });
//   }
// };

// module.exports = auth;



// fuction verifyuser authentication middleware 
const verifyUser = async (req, res, next) => {
        const token = req.header("Authorization")
        console.log("here is token",token)
        if (!token) {
            return res.status(401).send({
                'message': 'unauthorized, please login',
                'statusCode': 401
            })
        }

        try {
            const decode = jwt.verify(token, "Blogee")

            const user = await User.findOne({ _id: decode._id })

            if (!user) {
                return res.status(400).send({
                    'message': 'invalid token, please login',
                    'statusCode': 400
                })
            }

            req.token = token
            req.user = user

            next()

        } catch (e) {
            return res.status(400).send({
                'message': 'something went wrong, please try again.',
                'statusCode': 400
            })
        }
}


export default verifyUser