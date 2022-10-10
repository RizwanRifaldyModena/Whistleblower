import React from 'react'
import './header.scss'
import { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import format from "date-fns/format";
import { addDays } from 'date-fns';
const Header = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

  const handleChange = (e) => {
    setIsOpen(!isOpen);
    setStartDate(e);
  };
  const handleClick = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };
  const handleChange2 = (e) => {
    setIsOpen2(!isOpen2);
    setEndDate(e);
  };
  const handleClick2 = (e) => {
    // console.log('aa');
    e.preventDefault();
    setIsOpen2(!isOpen2);
  };
  

  return (
    <div className='header'>
      <div className='title_header text'>
        Whistleblower
      </div>

      <div className='filter_dashboard'>
        <div className='filter_dashboard_grid'>
          <select className='select'>
            <option>Indonesia</option>
          </select>
        </div>

        <div className='filter_dashboard_grid'>
          <p>To</p>
          <button onClick={handleClick} className='button_default' id='date2'>
            {format(startDate, "MMMM  yyyy")}
          </button>
          {isOpen && (
            <DatePicker 
            selected={startDate} 
            onChange={handleChange} 
            maxDate={addDays(new Date(), 5)}
            showMonthYearPicker
            showFullMonthYearPicker
            showTwoColumnMonthYearPicker 
            inline />
          )}
        </div>

        <div className='filter_dashboard_grid' style={{ paddingTop: '10px' }}>
          -
        </div>

        <div className='filter_dashboard_grid'>
          <p>From</p>
          <button onClick={handleClick2} className='button_default'  id='date1'>
            {format(endDate, "MMMM  yyyy")}
          </button>
          {isOpen2 && (
            <DatePicker 
            selected={endDate} 
            onChange={handleChange2} 
            maxDate={addDays(new Date(), 5)}
            showMonthYearPicker
            showFullMonthYearPicker
            showTwoColumnMonthYearPicker 
            inline />
          )}
        </div>
      </div>
    </div>
  )
}

export default Header