import React from 'react'
import './login.scss'
const Login = () => {
    return (
        <div className='wrap_login'>
            <div className='wrap_form_login'>
                <img src='./asset/modena-logo.png' className='login_logo' />
                <div className='form_login'>
                    <input type={'text'} className={'input_login'} placeholder={'Username'}/>
                    <input type={'text'} className={'input_login'} placeholder={'Username'}/>
                </div>
                <button>Submit</button>
            </div>
        </div>
    )
}

export default Login