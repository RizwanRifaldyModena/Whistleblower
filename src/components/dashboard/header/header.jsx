import React, { useState, useEffect } from 'react'
import './header.scss'
import { useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import format from "date-fns/format";
import { addDays } from 'date-fns';
const Header = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const navigate = useNavigate();

  const [itemsCountry, setItemsCountry] = useState([]);
  let token = (localStorage.getItem('user-token'));

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


  const loadDataCountry = async () => {

    const response = await fetch("http://devtest.modena.co.id/api-wbs/public/api/master/countries", {
      method: 'GET',
      headers: {
        "Content-Type": "Application/json",
        "Accept": "Application/json",
        "Authorization": `Bearer ${token}`
      }
    })
    const res = await response.json();
    // console.log(res.data);
    if (res.error === 'Unauthenticated.') {
      navigate('/login');
    }
    setItemsCountry(res.data);
  }

  useEffect(() => {
    if (localStorage.getItem('user-token') === null) {
      navigate('/login');
    }
    loadDataCountry()
  }, [])
  return (
    <div className='header'>
      <div className='title_header text'>
        Whistleblower
      </div>

      <div className='filter_dashboard'>
        <div className='filter_dashboard_grid'>
          <select className='select' key={'contry_filter'} id={'contry_filter'}>
            <option key={0} value={""}>Choose country</option>
            {
              itemsCountry.map((item, index) => (
                <option key={item.id} value={item.id}>{item.country_code.toUpperCase()} - {item.country_name}</option>
              ))
            }
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
          <button onClick={handleClick2} className='button_default' id='date1'>
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