import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { v4 as uuid } from 'uuid';
import './card.scss';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 380,
  background: '#fff',
  outline: 'none',
  borderRadius: '5px'
};

const itemsFromBackendNew = [
  { id: 'data1', id_task: "80012", tanggal: "12/01/22", investigator: "Zwan", status_task: "1" },
  { id: 'data2', id_task: "80013", tanggal: "12/01/22", investigator: "Zwan", status_task: "2" },
];

const itemsFromBackendProgress = [
  { id: 'data3', id_task: "80012", tanggal: "12/01/22", investigator: "Zwan", status_task: "3" },
  { id: 'data4', id_task: "80013", tanggal: "12/01/22", investigator: "Zwan", status_task: "4" },
  { id: 'data5', id_task: "80013", tanggal: "12/01/22", investigator: "Zwan", status_task: "5" },
];

const itemsFromBackendDone = [
  { id: 'data6', id_task: "80012", tanggal: "12/01/22", investigator: "Zwan", status_task: "6" },
  { id: 'data7', id_task: "80013", tanggal: "12/01/22", investigator: "Zwan", status_task: "7" },
];
const columnsFromBackend = {
  ['Kolom1']: {
    name: "New",
    backgroundBase: "#12506B",
    backgroundTitle: "#083346",
    totalData: 2,
    items: itemsFromBackendNew
  },
  ['Kolom2']: {
    name: "On Progress",
    backgroundBase: "#4F126B",
    backgroundTitle: "#150846",
    totalData: 3,
    items: itemsFromBackendProgress
  },
  ['Kolom3']: {
    name: "Done",
    backgroundBase: "#126B46",
    backgroundTitle: "#08462C",
    totalData: 2,
    items: itemsFromBackendDone
  }
};
// console.log(columnsFromBackend[1].items);

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

const Card = () => {

  const [columns, setColumns] = useState(columnsFromBackend);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
              Status Laporan <br/>
              <div className="modal_filter_select">
                <select>
                  <option>On Progress</option>
                </select>
              </div>
            </div>
            
            <div className="modal_filter_wrap ml-1">
              Status Tindak Lanjut <br/>
              <div className="modal_filter_select">
                <select className="ml-s-1">
                  <option>Receive</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="modal_form">
            Investigator<br/>
            <input type={'text'} placeholder={'Input Email'} /><br/>
            
            Description<br/>
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