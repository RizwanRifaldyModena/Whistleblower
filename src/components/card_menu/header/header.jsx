import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import './header.scss'
const Header = () => {
  const token = (localStorage.getItem('user-token'));
  const navigate = useNavigate();
  const [Categories, setCategories] = useState([]);
  // console.log(token);
  const loadDataCategory = async () => {

    const response = await fetch("http://devtest.modena.co.id/api-wbs/public/api/master/categories", {
      method: 'GET',
      headers: {
        "Content-Type": "Application/json",
        "Accept": "Application/json",
        "Authorization": `Bearer ${token}`
      }
    })
    const res = await response.json();
    if (res.error === 'Unauthenticated.') {
      navigate('/login');
    }
    setCategories(res.data);

  }

  useEffect(() => {
    if (localStorage.getItem('user-token') === null) {
      navigate('/login');
    }
    loadDataCategory()

  }, [])
  return (
    <div className='header'>
      <div className='title_header text'>
        <select>
          {
            Categories.map((item, index) => (
              <option key={item.category}>{item.category}</option>
            ))
          }
        </select>
        <div className='bg-select'>
          <img src='/asset/button.png' className="button" />

        </div>
      </div>
      <div className='title_header count'>6 whistle</div>
    </div>
  )
}

export default Header