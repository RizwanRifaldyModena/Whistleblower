import React, { useState, useEffect } from 'react'
import './confirm.scss'
import {useNavigate} from 'react-router-dom';
const Login = () => {
    const navigate = useNavigate();
    const user_email = localStorage.getItem('user-email');
    const [OTP, setOTP] = useState("");

    async function goToHome() {
        let item = (user_email);
        // console.log(item);

        let result = await fetch("http://devtest.modena.co.id/api-wbs/public/api/check-otp", {
            method: 'POST',
            headers: {
                "Content-Type": "Application/json",
                "Accept": "Application/json"
            },
            body: JSON.stringify({ "email": item, "otp": OTP  })
        })
        result = await result.json();
        var keys = Object.keys(result);
        // console.log(result)
        if(result.success === true){
            localStorage.setItem('user-token', result.data['token']);
            localStorage.setItem('username', result.data['name']);
            navigate('/');
        }else{
            console.log("Login gagal, cek kembali OTP");
            alert('Login gagal, cek kembali OTP');
        }
    };

    return (
        <div className='wrap_login'>
            <div className='wrap_form_login'>
                <img src='./asset/modena-logo.png' className='login_logo' />
                <p>Whistle Blower System</p>
                <div className='form_login'>
                <input 
                    type={'text'} 
                    maxLength={'8'} 
                    className={'input_login'} 
                    placeholder={'Enter OTP Code from email'}
                    onChange={(e) => setOTP(e.target.value)}
                />
                </div>
                <button  onClick={goToHome}>Submit</button>
            </div>
        </div>
    )
}

export default Login