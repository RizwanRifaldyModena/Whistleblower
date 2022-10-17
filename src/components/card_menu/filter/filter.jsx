import React, { useState, useEffect } from 'react'
import './filter.scss'
import { useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import format from "date-fns/format";
import { addDays } from 'date-fns';
const Filter = () => {
  
  const [startDate, setStartDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
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
          <select className='select' key={'contry_filter'} id={'contry_filter'}>
            <option key={0} value={""}>All Country</option>
            {
              itemsCountry.map((item, index) => (
                <option key={item.id} value={item.id}>{item.country_code.toUpperCase()} - {item.country_name}</option>
              ))
            }
          </select>
    </div>
  )
}

export default Filter