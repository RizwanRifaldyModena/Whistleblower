import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import './line_chart.scss'
import Chart from "chart.js/auto";
import { Line,Pie } from "react-chartjs-2";



const Linelabels = ["Januari", "Februari", "Maret", "April"];

const LineChart = {
    labels: Linelabels,
    datasets: [
        {
            label: "Whistle",
            backgroundColor: "#DAD7FE",
            borderColor: "#4339F2",
            data: [0, 10, 30, 40],
            fill: true
        },
    ]
};

const PieChart1 = {
    labels: ['Thread', 'Fraud', 'Corruption'],
    datasets: [
        {
            label: '# of Votes',
            data: [30, 30, 30],
            backgroundColor: [
                '#13C4CF',
                '#150846',
                '#4339F2',
            ],
            borderColor: [
                '#13C4CF',
                '#150846',
                '#4339F2',
            ],
            borderWidth: 1,
        },
    ],
};


const PieChart2 = {
    labels: ['Thread', 'Fraud', 'Corruption'],
    datasets: [
        {
            label: '# of Votes',
            data: [30, 30, 30],
            backgroundColor: [
                '#FFB200',
                '#FF3A29',
                '#4339F2',
            ],
            borderColor: [
                '#FFB200',
                '#FF3A29',
                '#4339F2',
            ],
            borderWidth: 1,
        },
    ],
};

const Line_chart = () => {
    // alert(localStorage.getItem('user-token'));
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('user-token')  === null) {
            navigate('/login');
        }
    }, [])
    
    return (
        <div>
            <div className='wrap_chart'>
                <div className='wrap_line_chart'>
                    <Line data={LineChart} options={{ plugins: { legend: { display: false, } } }} />
                </div>
                <div className='wrap_piechart'>
                    <div className='grid trans'>
                        <div className='card shadow'>
                            <div className='title'>Assigned</div>
                            <div className='count_data'>100</div>
                        </div>
                        <div className='card shadow mt'>
                            <div className='title'>On progress</div>
                            <div className='count_data'>200</div>
                        </div>
                        <div className='card shadow mt'>
                            <div className='title'>Closed</div>
                            <div className='count_data'>220</div>
                        </div>
                    </div>
                    <div className='grid shadow'>
                        <div className='pie_title'>
                            January
                            <img src='/asset/horizontal.png' className='p-i'/>
                        </div>
                        <div className='wrap_pie'> 
                            <Pie data={PieChart1} options={{ plugins: { legend: { display: false, } } }} />
                        </div>
                        <div className='color_detail'>
                            <ul>
                                <li><div className='dot c-1'></div>Corruption</li>
                                <li><div className='dot c-2'></div>Thread</li>
                                <li><div className='dot c-3'></div>Fraud</li>
                            </ul>
                        </div>
                    </div>
                    <div className='grid shadow'>     
                        <div className='pie_title'>
                            2022
                            <img src='/asset/horizontal.png' className='p-i'/>
                        </div>               
                        <div className='wrap_pie'> 
                            <Pie data={PieChart2} options={{ plugins: { legend: { display: false, } } }} />
                        </div>
                        <div className='color_detail'>
                            <ul>
                                <li><div className='dot c-4'></div>Corruption</li>
                                <li><div className='dot c-5'></div>Thread</li>
                                <li><div className='dot c-6'></div>Fraud</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Line_chart