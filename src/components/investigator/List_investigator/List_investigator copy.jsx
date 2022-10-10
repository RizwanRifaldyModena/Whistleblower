import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import './List_investigator.scss'
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'background.paper',
    outline: 'none'
};
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };




const List_investigator = () => {

    const [items, setItems] = useState([]);
    const navigate = useNavigate();


    // const fetch = require('node-fetch');

    const loadDataMaster = async () =>{
        let token = (localStorage.getItem('user-token'));

        const response = await fetch("http://devtest.modena.co.id/api-wbs/public/api/master/users", {
            method: 'GET',
            headers: {
                "Content-Type": "Application/json",
                "Accept": "Application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        const res = await response.json();
        setItems(res.data);
    }
    // loadDataMaster().then((res)=>console.log(res));
    // console.log(items.data);

    useEffect(() => {
        if (localStorage.getItem('user-token') === null) {
            navigate('/login');
        }
        loadDataMaster()
    }, [])

    const [isChecked, setIsChecked] = useState(false);
    const [openModalAddInvs, setOpen] = React.useState(false);
    const handleOpenModalAddInvs = () => setOpen(true);
    const handleCloseModalAddInvs = () => setOpen(false);

    // on check
    const handleOnChange = () => {
        setIsChecked(!isChecked);
    };
    // menu
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <div className='header'>
            {
                items.map((item) => ( 
                <div key = { item.id } > 
                    Full_Name: { item.name }<br/>
                    User_Email: { item.email } 
                </div>
                ))
            }
                <div className='title_header text'>
                    <input type={'text'} placeholder={'Search investigator name...'} />
                </div>
                <div className='filter_dashboard'>
                    <div className='filter_dashboard_grid'>
                        {/* <button className='button_default'  onClick={handleOpenModalAddInvs}>Add new investigator <img src='./asset/plus.png' /> </button> */}
                        <button className='button_default' onClick={handleOpenModalAddInvs}>Add new investigator <img src='./asset/plus.png' /> </button>
                    </div>

                    <div className='filter_dashboard_grid'>
                        <select className='select'>
                            <option>MHC Satrio</option>
                        </select>
                    </div>

                    <div className='check_grid'>

                        {isChecked ?
                            <div style={{ float: 'left', marginTop: '8px' }}>
                                <button className='deleteAllButton'><img src='./asset/delete.png' />
                                    Delete All
                                </button>
                            </div> :
                            ""
                        }
                        <Checkbox
                            {...label}
                            style={{ marginTop: '-3px' }}
                            id="check_all"
                            name="check_all"
                            value="all"
                            onChange={handleOnChange}
                        />
                        Choose All Investigator
                    </div>
                </div>
            </div>

            <div className='wrap_list_invst'>
                <div className='list_invst'>
                    <div className='title_invst'>
                        <Checkbox
                            {...label}
                            style={{ float: 'left' }}
                            id="check_all"
                            name="check_all"
                            value="all"
                        />
                        <div className='grid_round'>FE</div>
                        <div className='grid_title' >
                            <b>Investigator A</b><br />
                            <p>MHC SATRIO</p>
                        </div>
                        <div className='grid_action'>
                            <img src='./asset/more.png' onClick={handleClick} />
                        </div>
                    </div>
                </div>
                <div className='list_invst'>
                    <div className='title_invst'>
                        <Checkbox
                            {...label}
                            style={{ float: 'left' }}
                            id="check_all"
                            name="check_all"
                            value="all"
                        />
                        <div className='grid_round'>FE</div>
                        <div className='grid_title'>
                            <b>Investigator A</b><br />
                            <p>MHC SATRIO</p>
                        </div>
                        <div className='grid_action'>
                            <img src='./asset/more.png' onClick={handleClick} />
                        </div>
                    </div>
                </div>

            </div>


            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleClose}>Delete</MenuItem>
                <MenuItem onClick={handleClose}>Edit</MenuItem>
            </Menu>

            <Modal
                open={openModalAddInvs}
                onClose={handleCloseModalAddInvs}
            >
                <Box sx={style} className={'wrap_popup_inv'}>
                    <b>Add new investigator</b><br />
                    <p>Email</p>
                    <input type={'text'} placeholder={'Enter email'} />
                    <button>Submit</button>
                </Box>
            </Modal>
        </div>
    )
}

export default List_investigator