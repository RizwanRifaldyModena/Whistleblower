import React from 'react'
import './filter.scss'

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import format from "date-fns/format";
import { addDays } from 'date-fns';
const Filter = () => {
  
  const [startDate, setStartDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const handleChange = (e) => {
    setIsOpen(!isOpen);
    setStartDate(e);
  };
  const handleClick = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  return (
    <div className='filter'>
        <input type={'text'} className="search" placeholder='Search'/>
        <div className='wrap_date'>
          <button onClick={handleClick} className='button_default' id='date2'>
            {format(startDate, "MMMM  yyyy")}
          </button>
          {isOpen && (
            <DatePicker 
            selected={startDate} 
            onChange={handleChange} 
            maxDate={addDays(new Date(), 5)}
            showMonthYearPicker
            className='select'
            inline />
          )}
        </div>
        <select className='select'>
            <option value={''}>all location</option>
        </select>
    </div>
  )
}

export default Filter