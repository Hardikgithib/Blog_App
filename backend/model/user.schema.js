// const mongoose = require('mongoose')
import mongoose from 'mongoose';
//schema for user
const userSchema = new mongoose.Schema({
    uname: {
        type: String,
        required: true,
        trim: true,
        max: 25,
        validate: {
            validator: (v) => {
                return /^[a-zA-Z]+$/.test(v);
            },
            message: "Please enter valid first name"
        }
    },
    
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (v) => {
                return /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(v)
            },
            message: "Please enter valid email"
        }
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: (v) => {
                return /^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/.test(v)
            },
            message: "Please enter valid password"
        }
    },
    mobile: {
        type: String,
        // validate: {
        //     validator: (v) => {
        //         return /[6789][0-9]{9}/.test(v)
        //     },
        //     message: "Please enter valid mobile"
        // }
    },
    token: {
        type: String
    }
}, {
    timestamps: true
})

export const User = mongoose.model('User', userSchema);

