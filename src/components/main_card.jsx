import React from 'react'
import Header from './card_menu/header/header'
import Filter from './card_menu/filter/filter'
import Card from './card_menu/card/card'
import Sidebar from "./sidebar/sidebar";

const Main_card = () => {
  return (
    <div>
        <Sidebar/>
        {/* <Header/> */}
        {/* <Filter/> */}
        <Card/>
    </div>
  )
}

export default Main_card