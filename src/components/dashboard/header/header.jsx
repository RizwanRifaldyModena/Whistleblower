import React from 'react'
import './header.scss'
const Header = () => {
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
          <select className='select'>
            <option>May</option>
          </select>
        </div>
        
        <div className='filter_dashboard_grid' style={{ paddingTop:'10px'}}>
          -
        </div>
        
        <div className='filter_dashboard_grid'>
          <p>From</p>
          <select className='select'>
            <option>April</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default Header