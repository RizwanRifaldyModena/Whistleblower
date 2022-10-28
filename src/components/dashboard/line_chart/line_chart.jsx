import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import './line_chart.scss'
import Chart from "chart.js/auto";
import { Line, Pie } from "react-chartjs-2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import format from "date-fns/format";
import { addDays } from 'date-fns';


const Line_chart = (props) => {
    // Header Section
    // console.log(startDate)
    const [itemsCountry, setItemsCountry] = useState([]);
    const [startDate, setStartDate] = useState(new Date('2022'));
    const [ThisYear, setThisYear] = useState(new Date('2022'));
    const [PieFilterMonth, setPieFilterMonth] = useState(new Date());
    const [PieFilterYear, setPieFilterYear] = useState(new Date());

    const handleChangeMonth = (e) => {
        setIsOpenMonthPie(!isOpenMonthPie);
        setPieFilterMonth(e);
        loadPieChartDataMonth();
    };
    const handleChangeYear = (e) => {
        setIsOpenYearPie(!isOpenYearPie);
        setPieFilterYear(e);
        // alert(e)
        loadPieChartDataYear();
    };

    const handleChange2 = (e) => {
        setIsOpen2(!isOpen2);
        setStartDate(e);
        loadLineChartData();
    };
    const handleClick2 = (e) => {
        e.preventDefault();
        setIsOpen2(!isOpen2);
        loadLineChartData();
    };


    const handleClickYearPie = (e) => {
        e.preventDefault();
        setIsOpenYearPie(!isOpenYearPie);
    };

    const handleClickMonthPie = (e) => {
        e.preventDefault();
        setIsOpenMonthPie(!isOpenMonthPie);
    };


    // const [endDate, setEndDate] = useState(new Date());
    const [filterCountry, setFilterCountry] = useState([]);

    const [isOpen, setIsOpen] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [isOpenYearPie, setIsOpenYearPie] = useState(false);
    const [isOpenMonthPie, setIsOpenMonthPie] = useState(false);
    function changeCountry(event) {
        setFilterCountry(event.target.value);
        loadLineChartData();
    }
    // alert(filterCountry);
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

    // Line section
    const [CountNew, setCountNew] = useState([]);
    const [CountOnProgress, setCountOnProgress] = useState([]);
    const [CountDone, setCountDone] = useState([]);
    const [DataLineChart, setDataLineChart] = useState([]);
    const [DataPieChartYear, setDataPieChartYear] = useState([]);
    const [NamePieChartYear, setNamePieChartYear] = useState([]);
    const [DataPieChartMonth, setDataPieChartMonth] = useState([]);
    const [NamePieChartMonth, setNamePieChartMonth] = useState([]);
    const [CheckPieMonth, setCheckPieMonth] = useState([]);
    const [CheckPieYear, setCheckPieYear] = useState([]);

    // console.log(endDate)

    let token = (localStorage.getItem('user-token'));
    const loadCountData = async () => {

        const start = (format(startDate, 'yyyy'))
        // const end = (format(endDate, 'yyyy-MM'))

        const response = await fetch("http://devtest.modena.co.id/api-wbs/public/api/dashboard/count-by-status", {
            method: 'GET',
            headers: {
                "Content-Type": "Application/json",
                "Accept": "Application/json",
                "Authorization": `Bearer ${token}`
            }
        }).then((response) => response.json())
        // console.log(response.data[0].summary);
        if (response.error === 'Unauthenticated.') {
            navigate('/login');
        }
        setCountNew(response.data[0].summary)
        setCountOnProgress(response.data[1].summary)
        setCountDone(response.data[2].summary)
    }

    const loadLineChartData = async () => {
        const start = (format(startDate, 'yyyy'))
        // const end = (format(endDate, 'yyyy-MM'))
        const response = await fetch("http://devtest.modena.co.id/api-wbs/public/api/dashboard/line-chart?year=" + start + "&country_code=" + filterCountry, {
            method: 'GET',
            headers: {
                "Content-Type": "Application/json",
                "Accept": "Application/json",
                "Authorization": `Bearer ${token}`
            }
        }).then((response) => response.json())
        // console.log(response);
        if (response.error === 'Unauthenticated.') {
            navigate('/login');
        }
        setDataLineChart(response.data)
    }


    const loadPieChartDataYear = async () => {
        const year = (format(PieFilterYear, 'yyyy'))
        const response = await fetch("http://devtest.modena.co.id/api-wbs/public/api/dashboard/pie-chart?periode_type=year&year=" + year, {
            method: 'GET',
            headers: {
                "Content-Type": "Application/json",
                "Accept": "Application/json",
                "Authorization": `Bearer ${token}`
            }
        }).then((response) => response.json())
        // console.log(response.data.summary);
        if (response.error === 'Unauthenticated.') {
            navigate('/login');
        }


        if (response.success == true) {
            setDataPieChartYear(response.data.values)
            setNamePieChartYear(response.data.label)
            setCheckPieYear(response.data.summary)
        }
    }

    const loadPieChartDataMonth = async () => {
        const start = (format(PieFilterMonth, 'MM'))
        const year = (format(ThisYear, 'yyyy'))
        const response = await fetch("http://devtest.modena.co.id/api-wbs/public/api/dashboard/pie-chart?periode_type=month&month=" + start + "&year=" + year, {
            method: 'GET',
            headers: {
                "Content-Type": "Application/json",
                "Accept": "Application/json",
                "Authorization": `Bearer ${token}`
            }
        }).then((response) => response.json())
        // console.log(start);
        if (response.error === 'Unauthenticated.') {
            navigate('/login');
        }
        // console.log(response.success)
        if (response.success === true) {
            setDataPieChartMonth(response.data.values)
            setNamePieChartMonth(response.data.label)
            setCheckPieMonth(response.data.summary)
        }
    }

    const Linelabels = ["Jan", "Feb", "Maret", "April", "Mei", "Juni", "Juli", "Agust", "Sept", "Okt. ", "Nov", "Des"];

    const LineChart = {
        labels: Linelabels,
        datasets: [
            {
                label: "Whistle",
                backgroundColor: "#DAD7FE",
                borderColor: "#4339F2",
                data: DataLineChart,
                fill: true
            },
        ]
    };

    const PieChart2 = {
        labels: NamePieChartYear,
        datasets: [
            {
                label: '# of Votes',
                data: DataPieChartYear,
                backgroundColor: [
                    '#be7c25',
                    '#7725be',
                    '#bc25be',
                    '#be2528',
                    '#13C4CF',
                    '#150846',
                    '#f6f431',
                    '#2596be',
                    '#25be8c',
                    '#6fbe25',
                ],
                borderColor: [
                    '#be7c25',
                    '#7725be',
                    '#bc25be',
                    '#be2528',
                    '#13C4CF',
                    '#150846',
                    '#f6f431',
                    '#2596be',
                    '#25be8c',
                    '#6fbe25',
                ],
                borderWidth: 1,
            },
        ],
    };


    const PieChart1 = {
        labels: NamePieChartMonth,
        datasets: [
            {
                label: '# of Votes',
                data: DataPieChartMonth,
                backgroundColor: [
                    '#be7c25',
                    '#7725be',
                    '#bc25be',
                    '#be2528',
                    '#13C4CF',
                    '#150846',
                    '#f6f431',
                    '#2596be',
                    '#25be8c',
                    '#6fbe25',
                ],
                borderColor: [
                    '#be7c25',
                    '#7725be',
                    '#bc25be',
                    '#be2528',
                    '#13C4CF',
                    '#150846',
                    '#f6f431',
                    '#2596be',
                    '#25be8c',
                    '#6fbe25',
                ],
                borderWidth: 1,
            },
        ],
    };

    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('user-token') === null) {
            navigate('/login');
        }
        // console.log(localStorage.getItem('user-token'));
        loadCountData();
        loadLineChartData();
        loadPieChartDataYear();
        loadPieChartDataMonth();
        loadDataCountry()
    }, [startDate, filterCountry, PieFilterMonth, PieFilterYear])

    // console.log(format(startDate, 'MM-yyyy'))

    return (
        <div>
            <div className='header'>
                <div className='title_header text'>
                    Whistleblower
                </div>
            </div>
            <div className='wrap_chart'>

                <div className='wrap_piechart'>
                    <div className='grid trans'>
                        <div className='card shadow'>
                            <div className='title'>Assigned</div>
                            <div className='count_data'>{CountNew}</div>
                        </div>
                        <div className='card shadow mt'>
                            <div className='title'>On progress</div>
                            <div className='count_data'>{CountOnProgress}</div>
                        </div>
                        <div className='card shadow mt'>
                            <div className='title'>Closed</div>
                            <div className='count_data'>{CountDone}</div>
                        </div>
                    </div>
                    <div className='grid shadow'>
                        {CheckPieMonth == 0 ?
                            <div>
                                <img src='asset/not_found.png' className='not_found' />
                                <p className='not_found_info'>No whistle data found for this month</p>
                            </div>

                            : ""}
                        <div className='pie_title'>
                            {format(PieFilterMonth, 'MMMM')}
                            <img src='/asset/button.png' className='p-i' onClick={handleClickMonthPie} width={'35px'} />
                            {isOpenMonthPie && (
                                <DatePicker
                                    selected={startDate}
                                    onChange={handleChangeMonth}
                                    maxDate={addDays(new Date(), 5)}
                                    dateFormat="MM/yyyy"
                                    showMonthYearPicker
                                    inline />
                            )}
                        </div>

                        <div className='wrap_pie'>
                            <Pie data={PieChart1} options={{ plugins: { legend: { display: false, } } }} />
                        </div>
                        {/* <div className='color_detail'>
                            <ul>
                                <li><div className='dot c-1'></div>Corruption</li>
                                <li><div className='dot c-2'></div>Thread</li>
                                <li><div className='dot c-3'></div>Fraud</li>
                            </ul>
                        </div> */}
                    </div>
                    <div className='grid shadow'>
                        {CheckPieYear == 0 ?
                            <div>
                                <img src='asset/not_found.png' className='not_found' />
                                <p className='not_found_info'>No whistle data found for this year</p>
                            </div>

                            : ""}
                        <div className='pie_title'>
                            {format(PieFilterYear, 'yyyy')}

                            <img src='/asset/button.png' className='p-i' onClick={handleClickYearPie} width={'35px'} />

                            {isOpenYearPie && (
                                <DatePicker
                                    selected={startDate}
                                    onChange={handleChangeYear}
                                    maxDate={addDays(new Date(), 5)}
                                    showYearPicker
                                    showFullYearPicker
                                    showTwoColumnYearPicker
                                    inline />
                            )}
                        </div>
                        <div className='wrap_pie'>
                            <Pie data={PieChart2} options={{ plugins: { legend: { display: false, } } }} />
                        </div>
                        {/* <div className='color_detail'>
                            <ul>
                                <li><div className='dot c-4'></div>Corruption</li>
                                <li><div className='dot c-5'></div>Thread</li>
                                <li><div className='dot c-6'></div>Fraud</li>
                            </ul>
                        </div> */}
                    </div>
                </div>
                <div className='wrap_line_chart'>
                    <div className='filter_dashboard_chart'>
                        <div className='filter_dashboard_grid'>
                            <select className='select' key={'contry_filter'} id={'contry_filter'} value={changeCountry} onChange={changeCountry}>
                                <option key={0} value={""}>Choose country</option>
                                {
                                    itemsCountry.map((item, index) => (
                                        <option key={item.country_code} value={item.country_code}>{item.country_code.toUpperCase()} - {item.country_name}</option>
                                    ))
                                }
                            </select>
                        </div>

                        <div className='filter_dashboard_grid'>
                            <p>Periode</p>
                            <button onClick={handleClick2} className='button_default' id='date1'>
                                {format(startDate, "yyyy")}
                            </button>
                            {isOpen2 && (
                                <DatePicker
                                    selected={startDate}
                                    onChange={handleChange2}
                                    maxDate={addDays(new Date(), 5)}
                                    showYearPicker
                                    showFullYearPicker
                                    showTwoColumnYearPicker
                                    inline />
                            )}
                        </div>
                    </div>
                    <Line data={LineChart} options={{ plugins: { legend: { display: false, } } }} />
                </div>
            </div>
        </div>
    )
}

export default Line_chart