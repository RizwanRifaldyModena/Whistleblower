import React from 'react'
import './filter.scss'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const Filter = () => {
  return (
    <div className='filter'>
        <input type={'text'} className="search" placeholder='Search'/>
        <select className='select'>
            <option value={''}>Januari</option>
        </select>
        <select className='select'>
            <option value={''}>all location</option>
        </select>
    </div>
  )
}

export default Filter