import React, { useState, useEffect } from 'react'
import {useNavigate} from 'react-router-dom';
const Logout = () => {
    
    const navigate = useNavigate();
    useEffect(() => {    
        localStorage.clear();
        if (localStorage.getItem('user-token')  === null) {
            navigate('/login');
        }
    }, [])
    return (
        <div>Logout</div>
    )
}

export default Logout