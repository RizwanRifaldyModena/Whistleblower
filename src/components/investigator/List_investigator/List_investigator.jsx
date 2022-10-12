import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import './List_investigator.scss'
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import props from 'prop-types';
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
    const [email, setEmail] = useState("");
    let token = (localStorage.getItem('user-token'));

    async function editUser(userId) {
        alert(userId);
    }
    async function deleteUser(userId) {
        // alert(userId);
        if (window.confirm("Are You sure?")) {
            let result = await fetch("http://devtest.modena.co.id/api-wbs/public/api/master/users/delete/" + userId, {
                method: 'GET',
                headers: {
                    "Content-Type": "Application/json",
                    "Accept": "Application/json",
                    "Authorization": `Bearer ${token}`
                },
            })
            result = await result.json();
            console.log();
            if (result.success == true) {
                // loadDataMaster();
                navigate(0);

            }
        }
    }

    const loadDataMaster = async () => {

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
    async function InsertUser() {
        let data_email = (email);
        let result = await fetch("http://devtest.modena.co.id/api-wbs/public/api/master/users/create", {
            method: 'POST',
            headers: {
                "Content-Type": "Application/json",
                "Accept": "Application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ "email": data_email, "role_id": "2" })
        })
        result = await result.json();
        if (result.success === false) {
            alert(result.data.email);
        } else {
            navigate(0);
        }
    };

    useEffect(() => {
        if (localStorage.getItem('user-token') === null) {
            navigate('/login');
        }
        loadDataMaster()
        console.log(localStorage.getItem('user-token'));
    }, [])
    
    // check 
    const [isChecked, setIsChecked] = useState(false);

    // modal insert
    const [openModalAddInvs, setOpen] = React.useState(false);
    const handleOpenModalAddInvs = () => setOpen(true);
    const handleCloseModalAddInvs = () => setOpen(false);

    // on check
    const handleOnChange = () => {
        setIsChecked(!isChecked);
    };

    // menu
    const [anchorEl, setAnchorEl] = useState(null);

    // track with menu should be opened
    const [openIndex, setOpenIndex] = useState(-1);

    const handleMenu = (index) => (event) => {
        setAnchorEl(event.currentTarget);
        setOpenIndex(index); // set current menu index to open
    };

    const handleMenuClose = (event) => {
        setAnchorEl(null);
    };



    return (
        <div>
            <div className='header'>

                <div className='title_header text'>
                    <input type={'text'} placeholder={'Search investigator name...'} />
                </div>
                <div className='filter_dashboard'>
                    <div className='filter_dashboard_grid'>
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
            {
                items.map((item, index) => (
                    <div className='wrap_list_invst' key={item.id}>
                        <div className='list_invst'>
                            <div className='title_invst'>
                                
                                <Checkbox
                                    {...label}
                                    style={{ float: 'left' }}
                                    value={item.id}
                                     
                                    checked= {isChecked ? true :
                                        false
                                    }
                                />
                                <div className='grid_round'>{item.name.substring(0, 2).toUpperCase()}</div>
                                <div className='grid_title' >
                                    <b>{item.name} </b><br />
                                    <p>{item.email}</p>
                                </div>
                                <div className='grid_action'>
                                    <img src='./asset/more.png' onClick={handleMenu(index)} key={item.id}
                                        name={'basic-menu' + item.id}

                                    />
                                </div>
                            </div>
                        </div>

                    </div>


                ))
            }

            {
                items.map((item, index) => (
                    <Menu
                        open={Boolean(anchorEl) && index === openIndex}
                        onClose={handleMenuClose}
                        {...props}
                        anchorEl={anchorEl}
                        key={'menu'+index}
                    >
                        <MenuItem onClick={() => deleteUser(item.id)} key={index}>delete </MenuItem>
                        <MenuItem onClick={() => editUser(item.id)}>Edit</MenuItem>
                    </Menu>
                ))
            }
            <Modal
                open={openModalAddInvs}
                onClose={handleCloseModalAddInvs}
            >
                <Box sx={style} className={'wrap_popup_inv'}>
                    <b>Add new investigator</b><br />
                    <p>Email</p>
                    <input
                        type={'text'}
                        placeholder={'Enter email'}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button onClick={InsertUser}>Submit</button>
                </Box>
            </Modal>

            
            <Modal
                open={openModalAddInvs}
                onClose={handleCloseModalAddInvs}
            >
                <Box sx={style} className={'wrap_popup_inv'}>
                    <b>Add new investigator</b><br />
                    <p>Email</p>
                    <input
                        type={'text'}
                        placeholder={'Enter email'}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button onClick={InsertUser}>Submit</button>
                </Box>
            </Modal>
        </div>
    )
}

export default List_investigator