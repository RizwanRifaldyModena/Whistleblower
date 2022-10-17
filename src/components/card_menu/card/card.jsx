import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
// import { v4 as uuid } from 'uuid';
import './card.scss';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 400,
  background: '#fff',
  outline: 'none',
  borderRadius: '5px'
};

const Card = () => {
  // const [cardNew, setCardNew] = useState([]);



  const [cardNew, setCardNew] = useState([
    { id: 'data3', id_task: "80012", tanggal: "12/01/22", investigator: "Zwan", status_task: "1" },
    { id: 'data4', id_task: "80013", tanggal: "12/01/22", investigator: "Zwan", status_task: "2" },
  ])
  const [cardOnProgress, setCardOnProgress] = useState([
    { id: 'data3', id_task: "80012", tanggal: "12/01/22", investigator: "Zwan", status_task: "3" },
    { id: 'data4', id_task: "80013", tanggal: "12/01/22", investigator: "Zwan", status_task: "4" },
    { id: 'data5', id_task: "80013", tanggal: "12/01/22", investigator: "Zwan", status_task: "5" }
  ]);
  const [cardDone, setCardDone] = useState([
    { id: 'data6', id_task: "80012", tanggal: "12/01/22", investigator: "Zwan", status_task: "6" },
    { id: 'data7', id_task: "80013", tanggal: "12/01/22", investigator: "Zwan", status_task: "7" }
  ]);
  // console.log(shopCart);


  const columnsFromBackend = {
    ['new']: {
      name: "New",
      backgroundBase: "#12506B",
      backgroundTitle: "#083346",
      totalData: 2,
      items: cardNew
    },
    ['progress']: {
      name: "On Progress",
      backgroundBase: "#4F126B",
      backgroundTitle: "#150846",
      totalData: 3,
      items: cardOnProgress
    },
    ['done']: {
      name: "Done",
      backgroundBase: "#126B46",
      backgroundTitle: "#08462C",
      totalData: 2,
      items: cardDone
    }
  };


  let token = (localStorage.getItem('user-token'));

  const navigate = useNavigate();

  const [columns, setColumns] = useState(columnsFromBackend);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [items, setItems] = useState([]);


  const onDragEnd = (result, columns, setColumns) => {
    // console.log(result);
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setOpen(true);
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


  const loadDataCountry = async () => {

    const response = await fetch("http://devtest.modena.co.id/api-wbs/public/api/master/users", {
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


  const loadDataCard = async () => {

    const response = await fetch("http://devtest.modena.co.id/api-wbs/public/api/master/status", {
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
    
    console.log(res)
  }

  // auto load here
  useEffect(() => {
    if (localStorage.getItem('user-token') === null) {
      navigate('/login');
    }
    loadDataCountry()
    loadDataCard()
    


  }, [])

  return (
    <div className="wrapper_card">
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={style}>
          <div className="top_modal_wrap">
            <div className="status title_status_6">Corruption</div>
            <img src="./asset/close.png" className="close_modal" onClick={handleClose} />
          </div>
          <div className="modal_title_date">
            12/01/2022
          </div>
          <div className="modal_title_task">
            80012
          </div>
          <div className="modal_filter">
            <div className="modal_filter_wrap">
              Status Laporan <br />
              <div className="modal_filter_select">
                <select>
                  <option value={'1'}>New</option>
                  <option value={'2'}>On Progress</option>
                  <option value={'3'}>Done</option>
                </select>
              </div>
            </div>

            <div className="modal_filter_wrap ml-1">
              Status Tindak Lanjut <br />
              <div className="modal_filter_select">
                <select className="ml-s-1">
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
            <select name='investigator' id="investigator">

              {
                items.map((item, index) => (
                  <option value={item.id}>{item.name}</option>
                ))
              }
            </select><br />

            Description<br />
            <textarea></textarea>
            <button>Save</button>
          </div>
        </Box>
      </Modal>


      <div style={{ display: "flex", height: "100%" }}>
        <DragDropContext
          onDragEnd={result => onDragEnd(result, columns, setColumns)}
        >
          {Object.entries(columns).map(([columnId, column], index) => {
            // const no = 1;

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
                        >
                          {column.items.map((item, index) => {
                            return (
                              <Draggable
                                key={item.id}
                                draggableId={item.id}
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
                                          : "#fff", // before
                                        color: "#000",
                                        ...provided.draggableProps.style
                                      }}
                                      onClick={handleOpen}
                                    >
                                      <div className="title_date">
                                        {item.tanggal}
                                      </div>

                                      {item.status_task == '1' ? <div className="status title_status_1">Receive</div> : null}
                                      {item.status_task == '2' ? <div className="status title_status_2">Review</div> : null}
                                      {item.status_task == '3' ? <div className="status title_status_3">Receive</div> : null}
                                      {item.status_task == '4' ? <div className="status title_status_4">Assign</div> : null}
                                      {item.status_task == '5' ? <div className="status title_status_5">Report</div> : null}
                                      {item.status_task == '6' ? <div className="status title_status_6">Finish</div> : null}
                                      {item.status_task == '7' ? <div className="status title_status_7">Rejected</div> : null}
                                      {item.status_task == '8' ? <div className="status title_status_6">Corruption</div> : null}

                                      <img src='/asset/arrow.png' className="arrow" style={{ cursor: 'pointer' }} />

                                      <div className="title_task">
                                        {item.id_task}
                                      </div>

                                      <div className="title_investigator">
                                        Investigator : {item.investigator}
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