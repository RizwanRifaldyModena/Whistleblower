import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import './card.scss';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Select from 'react-select'


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 420,
  background: '#fff',
  outline: 'none',
  borderRadius: '5px'
};

const Card = () => {

  let token = (localStorage.getItem('user-token'));

  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [items, setItems] = useState([]);
  const [dataToPopUp, setdataToPopUp] = useState([]);


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
  async function openPopUpData(data) {
    handleOpen();
    setdataToPopUp(data)
  }
  const loadDataCard = async () => {

    const response = await fetch("http://devtest.modena.co.id/api-wbs/public/api/whistle-blower/get-assigned-tasks?country_code=id", {
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
    loadDataInvestigator()
    loadDataCard()
    console.log(localStorage.getItem('user-token'))
  }, [])



  const [columns, setColumns] = useState([]);
  const onDragEnd = (result, columns, setColumns) => {


    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      // openPopUpData(result)
      // setOpen(true);

      // console.log(result);
      const targetMove = destColumn.name;


      if (targetMove === 'New') {
        moveWBS(result.draggableId, 1)
      } else if (targetMove === 'On Progress') {
        moveWBS(result.draggableId, 2)
      } else if (targetMove === 'Done') {
        moveWBS(result.draggableId, 3)
      }
      // setCodeWBS()



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
  };


  async function moveWBS(codeWBS, ColumnTarget) {
    let result = await fetch("http://devtest.modena.co.id/api-wbs/public/api/whistle-blower/change-status", {
      method: 'POST',
      headers: {
        "Content-Type": "Application/json",
        "Accept": "Application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ "report_code": codeWBS, "status": ColumnTarget })
    })
    result = await result.json();
    loadDataCard();
  }
  // console.log(totalWBS)
  return (
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
            {dataToPopUp.generate_date}
          </div>
          <div className="modal_title_task">
            {dataToPopUp.report_code}
          </div>
          <div className="modal_filter">
            <div className="modal_filter_wrap">
              Status Laporan <br />
              <div className="modal_filter_select">
                <select key={'status_laporan'}>
                  <option value={'1'}>New</option>
                  <option value={'2'}>On Progress</option>
                  <option value={'3'}>Done</option>
                </select>
              </div>
            </div>

            <div className="modal_filter_wrap ml-1">
              Status Tindak Lanjut <br />
              <div className="modal_filter_select">
                <select className="ml-s-1" key={'status_tindak_lanjut'}>
                  <option>Receive</option>
                  <option>Review</option>
                  <option>Assign</option>
                  <option>Report</option>
                  <option>Finish</option>
                  <option>Reject</option>
                </select>
              </div>
            </div>
          </div>

          <div className="modal_form">
            Investigator<br />
            <Select
              options={items}
              isMulti
              className='select2'
              defaultValue={{ label: "Ade Harseno", value: 0 }}
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
            />
            {/* <select name='investigator' id="investigator" key="investigator">

              {
                items.map((item, index) => (
                  <option value={item.id} key={item.id}>{item.name}</option>
                ))
              }
            </select><br /> */}

            Description<br />
            <textarea></textarea>
            <button>Save</button>
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
                                        minHeight: "70px",
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

                                      {item.status_id == '1' ? <div className="status title_status_1">Receive</div> : null}
                                      {item.status_id == '2' ? <div className="status title_status_2">Review</div> : null}
                                      {item.status_id == '3' ? <div className="status title_status_3">Receive</div> : null}
                                      {item.status_id == '4' ? <div className="status title_status_4">Assign</div> : null}
                                      {item.status_id == '5' ? <div className="status title_status_5">Report</div> : null}
                                      {item.status_id == '6' ? <div className="status title_status_6">Finish</div> : null}
                                      {item.status_id == '7' ? <div className="status title_status_7">Rejected</div> : null}
                                      {item.status_id == '8' ? <div className="status title_status_6">Corruption</div> : null}



                                      <div className="title_task">
                                        {item.report_code}
                                      </div>

                                      <div className="title_investigator">
                                        Investigator :
                                        {
                                          item.whistle_blower_investigator.map((item, index) => (
                                            <b key={index}> {item.investigator_name}</b>
                                          ))
                                        }
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
  );
}

export default Card