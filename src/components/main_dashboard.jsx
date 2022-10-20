import React from 'react'
import Header from './dashboard/header/header'
import Line_chart from './dashboard/line_chart/line_chart'
import Sidebar from "./sidebar/sidebar";
const Main_dashboard = () => {
  return (
    <div>
        <Sidebar/>
        <Line_chart/>
    </div>
  )
}

export default Main_dashboard