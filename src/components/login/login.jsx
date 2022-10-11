import React, { useState, useEffect } from 'react'
import './login.scss'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");

    async function sendOTP() {
        let item = (email);
        let result = await fetch("http://devtest.modena.co.id/api-wbs/public/api/send-otp", {
            method: 'POST',
            headers: {
                "Content-Type": "Application/json",
                "Accept": "Application/json"
            },
            body: JSON.stringify({ "email": item })
        })
        result = await result.json();
        if(result.success == false){
            alert(result.message);
        }else{
            localStorage.setItem('user-email',item);
            navigate('/confirm');
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
                        className={'input_login'}
                        placeholder={'Username or Email'}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <button onClick={sendOTP}>Submit</button>
            </div>
        </div>
    )
}

export default Login