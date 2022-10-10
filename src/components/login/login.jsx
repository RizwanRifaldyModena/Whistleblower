import React, { useState } from 'react'
import './login.scss'

const Login = () => {
    return (
        <div className='wrap_login'>
            <div className='wrap_form_login'>
                <img src='./asset/modena-logo.png' className='login_logo' />
                <h3 className='center-text'>Whistle Blowing System</h3>
                <form action="">
                    <div className='form_login'>
                        <input type={'text'} className={'input_login'} placeholder={'Username'}/>
                        <input type={'password'} className={'input_login'} placeholder={'Password'}/>
                    </div>
                    <button type='submit'>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Login