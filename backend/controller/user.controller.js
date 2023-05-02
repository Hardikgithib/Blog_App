//const User = require('../model/user.schema')
import {User} from '../model/user.schema.js'
//const nodemailer = require("nodemailer");
//const bcrypt = require('bcryptjs');
import bcrypt from 'bcryptjs'
//const jwt = require('jsonwebtoken');
import jwt from 'jsonwebtoken'
//const otpGenerator = require('otp-generator')

//contoller for user related functions

//function for registering existing user
export const register = async (req, res) => {
    console.log("hello world")
    let { uname, email, password,mobile} = req.body

    try {

        let user = await User.findOne({ email })
    
        if (user) {
            return res.status(400).send({
                'message': 'user already exist, please try again.',
                'statusCode': 400
            })
        }
    
        const salt = await bcrypt.genSalt(10) // here we can doing password hashing using bcrypt
    
        password = await bcrypt.hash(password, salt)  // here we can doing password hashing using bcrypt
     
        // user = new User({
        //     uname, email, password, mobile    // saving the newuser in database
        // })

        const data = await User.create({ uname, email, password, mobile });

        //const data = await blogSchema.create({ userId, uname, title, body, tags });
    
        //await user.save()
    
        return res.status(201).send({
            'message': 'user registered successfully, please login.',
            'statusCode': 201
        })

    } catch(e) {
        console.log(e)
        return res.status(400).send({
            'message': 'something went wrong, Please try again.',
            'statusCode': 400
        })
    }
}

//function for user log in
export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        let user = await User.findOne({ email })

        if (!user) {
            return res.status(401).send({
                'message': 'Invalid email, please try again',
                'statusCode': 401
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(401).send({
                'message': 'Invalid password, please try again',
                'statusCode': 401
            })
        }

        const token = jwt.sign({ _id: user.id.toString() }, "Blogee")

        user.token = token

        await user.save()

        delete user._doc.password
        delete user._doc.__v

        return res.status(200).send({
            'message': 'login successful',
            'statusCode': 200,
            'data': user
        })

    } catch (e) {
        return res.status(400).send({
            'message': 'something went wrong, Please try again.',
            'statusCode': 400
        })
    }
}

