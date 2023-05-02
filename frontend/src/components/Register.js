import React from 'react'
import { Link } from "react-router-dom";
import {useState} from "react"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import swal from 'sweetalert';
export default function Register() {
    const navigate = useNavigate()
    // Declared state for user details which is passed payload to register api
    const [user, setUser] = useState({
        uname: "",
        email: "",
        password: "",
        confPass: "",
        mobile: "",
    })
    
    //Frontend error messages states declared here

    const [uErr, setuErr] = useState(false)
    const [emailerr, setEmailerr] = useState(false)
    const [moErr, setMoerr] = useState(false)
    const [pwdErr, setPwdErr] = useState(false)
    const [confPwdErr, setConfPwdErr] = useState(false)
    
    //Here is onChnage function of register form taking input here

    const handleChange = (e) =>{
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value,
        
    })
    setuErr(false)
    setEmailerr(false)
    setMoerr(false)
    setPwdErr(false)
    setConfPwdErr(false)
}

// function for registering new user in database

const register = (e) =>{
    e.preventDefault()

    //Declared here regular expressions variables for validating register form field

    const URegex=/^[a-zA-Z]+$/
    const eRegex= /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/
    const pwdRegex=/^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/
    const mobRegex=/[6789][0-9]{9}/

    //Testing register form validations from here

    if (user.uname === "" || !URegex.test(user.uname)) {
        setuErr(true)
    }
    else if (user.email === "" || !eRegex.test(user.email)) {
        setEmailerr(true)       
    }
    
    else if (user.password === "" || !pwdRegex.test(user.password)) {
        setPwdErr(true)       
    }
    else if (user.confPass === "" || user.password !== user.confPass) {
        setConfPwdErr(true)
    }
    else{
        const { uname, email, password, confPass, mobile} = user
        if (uname && email && password && confPass && (password === confPass)) {

            //Making http post request using axios to registering new user in system

            return axios.post('http://localhost:8081/register', user, { validateStatus: false }).then((res) => {
                if (res.data.statusCode === 201) {
                    swal(res.data.message ,"success")
                    
                    navigate('/')


                } else {
                    swal(res.data.message)
                }

            }).catch((err) => {
                alert(err)
            })
        }
        else {
            swal('invalid input, please try again')
        }
    }
    }

  return (
    <div className='bg '>
         <ToastContainer />

         <div class="login-container">
	<form action="" class="form-login">
		<ul class="login-nav">
			<li class="login-nav__item ">
			<Link to ="/">Sign in</Link>
			</li>
			<li class="login-nav__item active">
				<Link to = "/Signup">SignUp</Link>
			</li>
			
		</ul>
		<label for="login-input-user" class="login__label">
			Username *
		</label>
		<input id="login-input-user" class="login__input" type="text" name="uname" value={user.uname} onChange={handleChange} />
{uErr ? <p style={{color:"red"}}>Please enter valid Username</p> : false}
		<label for="login-input-password" class="login__label">
			Email *
		</label>
		<input id="login-input-user" class="login__input" type="email" name="email" value={user.email}  onChange={handleChange}/>
        {emailerr?<p style={{color:"red"}}>Please enter valid Email</p>:false}
		<label for="login-input-password" class="login__label">
			Phone Number *
		</label>
		<input id="login-input-user" class="login__input" type="number" name="mobile" value={user.mobile} onChange={handleChange}/>
        {moErr?<p style={{color:"red"}}>Please enter valid mobile number</p>:false}
		<label for="login-input-password" class="login__label">
			Password *
		</label>
		<input id="login-input-user" class="login__input" type="password" name="password" value={user.password} onChange={handleChange}/>
        {pwdErr?<p style={{color:"red"}}>Password should content one upper case, number and special charector</p>:false}
		<label for="login-input-password" class="login__label">
			Confirm Password *
		</label>
		<input id="login-input-password" class="login__input" type="password" name="confPass" value={user.confPass} onChange={handleChange}/>
        {confPwdErr?<p style={{color:"red"}}>password and confirm password should match</p>:false}
		<button class="login__submit" onClick={register} >Register</button>
	</form>
	
</div>
  )

    </div>
  )
}
