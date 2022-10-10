import React from 'react'
import './header.scss'
const Header = () => {
  
  return (
    <div className='header'>
      <div className='title_header text'>
        <select>
            <option>Kecurangan</option>
            <option>Pencurian</option>
            <option>Korupsi</option>
            <option>Suap</option>
            <option>Gratifikasi</option>
            <option>Penyalah gunaan wewenang</option>
            <option>Benturan kepentingan</option>
            <option>Benturan kepentingan</option>
            <option>Pelecehan</option>
            <option>Pelanggaran Peraturan Perusahaan</option>
            <option>Pelanggaran Hukum dan Perundang-Undangan</option>
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