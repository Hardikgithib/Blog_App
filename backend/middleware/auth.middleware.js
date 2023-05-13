
import jwt from 'jsonwebtoken'

import {User} from "../model/user.schema.js"
 
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