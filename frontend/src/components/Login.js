import React from 'react'
import "./Login.css"
import { Link } from "react-router-dom";
import { useState } from 'react';
import axios from 'axios'
import { useNavigate} from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import swal from 'sweetalert';
export default function Login() {
    const navigate = useNavigate()
    const [user, setUser] = useState({
        email: "",
        password: ""
    })
    const [emailErr,setEmailErr] = useState(false)
    const [passwordErr,setPasswordErr] = useState(false)

    const handleChange = (e) =>{
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value,     
    })
    setEmailErr(false)
    setPasswordErr(false)
    }

    const login = (e) =>{
        e.preventDefault()
       
        const eRegex= /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/
        const pwdRegex=/^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/
        if (user.email === "" || !eRegex.test(user.email)) {
            setEmailErr(true)
            
        }
        else if (user.password === "" || !pwdRegex.test(user.password)) {
            setPasswordErr(true)
           
        }
        else
        {
            axios.post('http://localhost:8081/login',user,{ validateStatus: false }).then((res)=>{
            if (res.data.statusCode === 200) {
               
                const record = localStorage.setItem('token', res.data.data.token) // storing token in local storage
               
                const user = localStorage.setItem('user', JSON.stringify(res.data.data)) // mapping user details
                navigate('/AddBlog')
                swal(res.data.message,"success")

            } else {
                swal(res.data.message)
            }       
        }).catch((err) => {
            swal(err)
        })
        }
    }

   
  return (
    <div >
    <div className="login-container "  >
	<form action="" Class="form-login" style={{height:"80%"}}>
		<ul Class="login-nav">
			<li Class="login-nav__item active ">
			<Link to ="/">Sign in</Link>
			</li>
			<li Class="login-nav__item ">
			<Link to = "/Register">SignUp</Link>
			</li>
		</ul>
		<label for="login-input-user" Class="login__label">
			Email
		</label>
		<input id="login-input-user" Class="login__input" name="email" value={user.email} type="text" onChange={handleChange} />
        {emailErr?<p style={{color:"red"}}>Please Enter Valid Email</p>:false}
		<label for="login-input-password" Class="login__label">
			Password
		</label>
		<input id="login-input-password" Class="login__input" name="password" value={user.password} type="password" onChange={handleChange} />
        {passwordErr?<p style={{color:"red"}}>Please Enter Valid Password</p>:false}
		
		<button Class="login__submit" onClick={login}>Sign in</button>
	</form>
	
</div>
</div>
  )
}
