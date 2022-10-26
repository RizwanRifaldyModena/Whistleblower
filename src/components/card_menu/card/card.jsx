import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import './card.scss';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Select from 'react-select'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import format from "date-fns/format";
import { addDays } from 'date-fns';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  height: 420,
  background: '#fff',
  outline: 'none',
  borderRadius: '5px'
};

const Card = () => {
  // Header  
  const [Categories, setCategories] = useState([]);
  const [TotalCategories, setTotalCategories] = useState([]);
  const [FilterCategory, setFilterCategory] = useState([]);
  const [FilterCountry, setFilterCountry] = useState([]);
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
  //Filter

  const [startDate, setStartDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [DataSearch, setSearch] = useState([]);
  const [AddDescription, setAddDescription] = useState([]);
  const [itemsCountry, setItemsCountry] = useState([]);
  const [CodeReport, setCodeReport] = useState([]);
  const [StatusID, setStatusID] = useState([]);

  const handleChange = (e) => {
    setIsOpen(!isOpen);
    setStartDate(e);
  };
  const handleClick = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const SearchData = (txtSearch) => {
    setSearch(txtSearch)
    loadDataCard()
    // console.log(txtSearch)
  };
  async function updateWBS() {

    const investigatorNames = SelectInvestigator.map(e => e.value).join(';');
    // console.log(SelectInvestigator)
    let result = await fetch("http://devtest.modena.co.id/api-wbs/public/api/whistle-blower/update", {
      method: 'POST',
      headers: {
        "Content-Type": "Application/json",
        "Accept": "Application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        "report_code": CodeReport,
        "sub_status_id": DataSubStatus,
        "description": AddDescription,
        "conclusion": '',
        "investigators": investigatorNames,
        "status_id": StatusID,
      })
    })
    result = await result.json();
    loadDataCard()
    handleClose()

  };
  const chooseCategory = (search) => {
    // alert(search)
    setFilterCategory(search)
    loadDataCard()
  }
  const choosePeriode = (e) => {
    setIsOpen(!isOpen);
    setStartDate(e);
    loadDataCard()
  }
  const chooseContry = (search) => {
    // alert(search)
    setFilterCountry(search)
    loadDataCard()
  }
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


  // card DND
  let token = (localStorage.getItem('user-token'));
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [items, setItems] = useState([]);
  const [dataToPopUp, setdataToPopUp] = useState([]);
  const [dataDrag, setdataDrag] = useState([]);
  const [DataSubStatus, setDataSubStatus] = useState([]);
  const [DataStatus, setDataStatus] = useState([]);
  const [SelectInvestigator, setSelectInvestigator] = useState([]);
  const [SubStatusPopup, setSubStatusPopup] = useState([]);


  const loadDataInvestigator = async () => {

    const response = await fetch("http://devtest.modena.co.id/api-wbs/public/api/whistle-blower/signing-to-investigator/list-investigators", {
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
    setItems(res.data);

  }
  const changeSubStatus = (subStatus) => {
    if (subStatus == 1) {
      setStatusID('1')
      setDataStatus('New')
    } else if (subStatus == 3 || subStatus == 4 || subStatus == 2) {
      setStatusID('2')
      setDataStatus('On Progress')
    } else if (subStatus == 5 || subStatus == 6) {
      setStatusID('3')
      setDataStatus('Done')
    }
    setDataSubStatus(subStatus)
  };

  async function openPopUpData(data) {

    setAddDescription(data.description)
    setCodeReport(data.report_code)
    setSelectInvestigator(data.whistle_blower_investigator)
    setDataSubStatus(data.sub_status_id)
    setStatusID(data.status_id)
    setSubStatusPopup(data.sub_status_id)
    // console.log(data);
    handleOpen();
    setdataToPopUp(data)
  }

  const loadDataCard = async () => {
    const filterDate = format(startDate, 'yyyy-MM');
    // alert(filterDate)
    const response = await fetch("http://devtest.modena.co.id/api-wbs/public/api/whistle-blower/get-assigned-tasks?country_code=" + FilterCountry + "&search=" + DataSearch + "&category=" + FilterCategory + "&periode=" + filterDate, {
      method: 'GET',
      headers: {
        "Content-Type": "Application/json",
        "Accept": "Application/json",
        "Authorization": `Bearer ${token}`
      }
    }).then((response) => response.json())

    if (response.error === 'Unauthenticated.') {
      navigate('/login');
    }
    const newData = response.data[0].whistle_blower;
    const onProgressData = response.data[1].whistle_blower;
    const doneData = response.data[2].whistle_blower;
    // console.log(response)
    const countNew = newData.length
    const countOnProgress = onProgressData.length
    const countDone = doneData.length

    setTotalCategories(countNew + countOnProgress + countDone)

    const columnsFromBackend = {
      ['new']: {
        name: "New",
        backgroundBase: "#12506B",
        backgroundTitle: "#083346",
        totalData: countNew,
        items: newData,
      },
      ['progress']: {
        name: "On Progress",
        backgroundBase: "#4F126B",
        backgroundTitle: "#150846",
        totalData: countOnProgress,
        items: onProgressData
      },
      ['done']: {
        name: "Done",
        backgroundBase: "#126B46",
        backgroundTitle: "#08462C",
        totalData: countDone,
        items: doneData
      }
    };
    setColumns(columnsFromBackend)
  }


  useEffect(() => {
    if (localStorage.getItem('user-token') === null) {
      navigate('/login');
    }
    setTimeout(function () {
      loadDataCard()
    }, 800);
    // setStatusID('1')

  }, [DataSearch, FilterCategory, FilterCountry, startDate, StatusID, dataToPopUp, DataSubStatus])

  useEffect(() => {
    loadDataInvestigator()
    loadDataCategory()
    loadDataCountry()
    console.log(localStorage.getItem('user-token'))
  }, [])



  const [columns, setColumns] = useState([]);

  const getCardById = async (idCard) => {
    // alert(idCard)

    const response = await fetch("http://devtest.modena.co.id/api-wbs/public/api/whistle-blower/get-assigned-tasks/" + idCard, {
      method: 'GET',
      headers: {
        "Content-Type": "Application/json",
        "Accept": "Application/json",
        "Authorization": `Bearer ${token}`
      }
    }).then((response) => response.json())
    // console.log(response)
    setAddDescription(response.data.description)
    setCodeReport(response.data.report_code)
    setSelectInvestigator(response.data.whistle_blower_investigator)
    setDataSubStatus(response.data.sub_status_id)
    setdataToPopUp(response.data)
    // console.log(response.data.whistle_blower_investigator);
    // console.log(StatusID)

    handleOpen();

  }
  const onDragEnd = (result, columns, setColumns) => {

    // console.log(dataToPopUp)

    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      const targetMove = destColumn.name;
      console.log(targetMove)
      if (targetMove === 'New') {
        moveWBS(result.draggableId, 1, 1)
        setStatusID(1)
        setSubStatusPopup(1)
        // console.log(destColumn)
      } else if (targetMove === 'On Progress') {
        moveWBS(result.draggableId, 2, 2)
        setStatusID(2)
        setSubStatusPopup(2)
        // console.log(destColumn)
      } else if (targetMove === 'Done') {
        moveWBS(result.draggableId, 3, 5)
        setStatusID(3)
        setSubStatusPopup(5)
        // console.log(destColumn)
      }
      // handleOpen()
      // openPopUpData(dataToPopUp)
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems
        }
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems
        }
      });
    }
    getCardById(result.draggableId)
  };
  async function moveWBS(codeWBS, ColumnTarget, subStatus) {
    let result = await fetch("http://devtest.modena.co.id/api-wbs/public/api/whistle-blower/change-status", {
      method: 'POST',
      headers: {
        "Content-Type": "Application/json",
        "Accept": "Application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ "report_code": codeWBS, "status_id": ColumnTarget, "sub_status_id": subStatus })
    })
    result = await result.json();
    loadDataCard();
  }
  // console.log(DataSubStatus)
  return (
    <div>
      <div className='header'>
        <div className='title_header text'>
          Whistle Blower Task
        </div>
        <div className='title_header count'>{TotalCategories} whistle - {FilterCategory} {FilterCategory === "All" ? "Category" : ""}</div>
      </div>
      <div className='filter'>
        <input type={'text'} className="search" placeholder='Search' onChange={(e) => SearchData(e.target.value)} />
        <div className='wrap_date'>
          <button onClick={handleClick} className='button_default mr-filter' id='date2' >
            {format(startDate, "MMMM  yyyy")}
          </button>
          {isOpen && (
            <DatePicker
              selected={startDate}
              onChange={choosePeriode}
              maxDate={addDays(new Date(), 5)}
              showMonthYearPicker
              className='select'
              inline />
          )}
        </div>
        <select className='select' key={'contry_filter'} id={'contry_filter'} onChange={(e) => chooseContry(e.target.value)}>
          <option key={"All"} value={"All"}>All Country</option>
          {
            itemsCountry.map((item, index) => (
              <option key={item.country_code} value={item.country_code}>{item.country_code.toUpperCase()} - {item.country_name}</option>
            ))
          }
        </select>
        <select className='select' onChange={(e) => chooseCategory(e.target.value)}>
          <option key={'All'} value={'All'}> All Category</option>
          {
            Categories.map((item, index) => (
              <option key={item.category}>{item.category}</option>
            ))
          }
        </select>
      </div>
      <div className="wrapper_card">
        <Modal
          open={open}
          onClose={handleClose}
        >
          <Box sx={style}>
            <div className="top_modal_wrap">
              {open === true ?
                dataToPopUp.whistle_blower_category.map((item, index) => (
                  <div className="status_popup title_status_6" key={index}>{item.category}</div>
                ))
                : null}

              <img src="./asset/close.png" className="close_modal" onClick={handleClose} />
            </div>
            <div className="modal_title_date">
              {dataToPopUp.generate_date} {DataSubStatus}
            </div>
            <div className="modal_title_task">
              {dataToPopUp.report_code}
            </div>
            <div className="modal_filter">
              <div className="modal_filter_wrap">
                Status Laporan <br />
                <div className="modal_filter_select">

                  {DataStatus == false ?
                    <b>
                      {StatusID == '1' ? "New" : ""}
                      {StatusID == '2' ? "On Progress" : ""}
                      {StatusID == '3' ? "Done" : ""}
                    </b>
                    : <b>{DataStatus}</b>}
                </div>
              </div>

              <div className="modal_filter_wrap ml-1">
                Status Tindak Lanjut  <br />
                <div className="modal_filter_select">
                  {/* {SubStatusPopup == true ? */}
                    <select className="ml-s-1" key={'status_tindak_lanjut'} onChange={(e) => changeSubStatus(e.target.value)} >
                      {SubStatusPopup == '1' ? <option value='1' selected>Receive</option> : <option value='1' >Receive</option>}
                      {SubStatusPopup == '2' ? <option value='2' selected>Review</option> : <option value='2' >Review</option>}
                      {SubStatusPopup == '3' ? <option value='3' selected>Assign</option> : <option value='3' >Assign</option>}
                      {SubStatusPopup == '4' ? <option value='4' selected>Report</option> : <option value='4' >Report</option>}
                      {SubStatusPopup == '5' ? <option value='5' selected>Finish</option> : <option value='5' >Finish</option>}
                      {SubStatusPopup == '6' ? <option value='6' selected>Rejected</option> : <option value='6' >Rejected</option>}
                    </select>
                  {/* } */}
                </div>
              </div>
            </div>

            <div className="modal_form">
              Investigator<br />
              <Select
                options={items}
                isMulti
                className='select2'
                defaultValue={dataToPopUp.whistle_blower_investigator}
                styles={{
                  control: (base, state) => ({
                    ...base,
                    boxShadow: "none",
                    "&:focus-within": {
                      borderColor: "#000",
                      boxShadow: "none",
                    }
                  })
                }}
                onChange={(chioce) => setSelectInvestigator(chioce)}
              />
              Description<br />
              <textarea onChange={(e) => setAddDescription(e.target.value)}>{AddDescription}</textarea>
              <button onClick={() => updateWBS()} >Save</button>
            </div>
          </Box>
        </Modal>


        <div style={{ display: "flex", height: "100%" }}>
          <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
            {Object.entries(columns).map(([columnId, column], index) => {
              return (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                  }}
                  key={columnId}
                >
                  <div className="titleWistle" style={{ background: column.backgroundTitle }}>
                    {column.name} ({column.totalData} Wistle)
                  </div>
                  <div className="wrap">
                    <Droppable droppableId={columnId} key={columnId}>
                      {(provided, snapshot) => {
                        return (
                          <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className='CardWrap'
                            style={{
                              background: column.backgroundBase,
                              padding: 10,
                              paddingTop: 70,
                              width: 250,
                              minHeight: 0
                            }}
                            key={columnId}
                          >
                            {column.items.map((item, index) => {
                              return (
                                <Draggable
                                  key={item.report_code}
                                  draggableId={item.report_code}
                                  index={index}
                                >

                                  {(provided, snapshot) => {
                                    return (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={{
                                          userSelect: "none",
                                          padding: 16,
                                          margin: "0 0 8px 0",
                                          Height: "auto",
                                          borderRadius: '5px',
                                          backgroundColor: snapshot.isDragging
                                            ? "#fff" // affter
                                            : "#fff", // before;
                                          color: "#000",
                                          ...provided.draggableProps.style
                                        }}
                                        onClick={() => openPopUpData(item)}
                                      >
                                        <img src='/asset/arrow.png' className="arrow_img" style={{ cursor: 'pointer' }} />
                                        <div className="title_date">
                                          {item.generate_date}
                                        </div>

                                        {item.sub_status_id == '1' ? <div className="status title_status_1">Receive</div> : null}
                                        {item.sub_status_id == '2' ? <div className="status title_status_2">Review</div> : null}
                                        {item.sub_status_id == '3' ? <div className="status title_status_4">Assign</div> : null}
                                        {item.sub_status_id == '4' ? <div className="status title_status_5">Report</div> : null}
                                        {item.sub_status_id == '5' ? <div className="status title_status_6">Finish</div> : null}
                                        {item.sub_status_id == '6' ? <div className="status title_status_7">Rejected</div> : null}


                                        <div className="title_task">
                                          {item.report_code}
                                          <div className='title_inv'>
                                            <div className="title_investigator">
                                              Investigator :
                                              {
                                                item.whistle_blower_investigator.map((data, index) => (
                                                  <b key={index} > {data.label}{item.whistle_blower_investigator.length - 1 == index ? "" : ","}  </b>
                                                ))
                                              }
                                            </div>
                                          </div>
                                        </div>



                                      </div>
                                    );
                                  }}
                                </Draggable>
                              );
                            })}
                            {provided.placeholder}
                          </div>
                        );
                      }}
                    </Droppable>
                  </div>
                </div>
              );
            })}
          </DragDropContext>
        </div>
      </div>
    </div>
  );
}

export default Card