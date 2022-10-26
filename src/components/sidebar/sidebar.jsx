import React from 'react'
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import './sidebar.scss'
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const username = localStorage.getItem('username');
    const navigate = useNavigate();
    async function moveLink1() {navigate('/');};
    async function moveLink2() {navigate('/card_list');};
    async function moveLink3() {navigate('/investigator');};
    return (
        <div>
            <SideNav>
                <SideNav.Toggle />
                
                <SideNav.Nav defaultSelected="home">
                    
                    <NavItem eventKey="home" onClick={moveLink1} >
                        <NavIcon>
                            <a href='/'>
                                <img src="/asset/profile.png" width='30px' style={{ marginTop: '10px' }} />
                            </a>
                        </NavIcon>
                        <NavText>
                            <a href='/'>
                                <div className='profile_detail'>
                                    {username}
                                    <p>Admin</p>
                                </div>
                             </a> 
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="Dashboard" onClick={moveLink1}>
                        <NavIcon>
                            <a href='/'>
                                <img src="/asset/dashboard.png" width={'20px'} />
                            </a>
                        </NavIcon>
                        <NavText>
                            <a href='/'>
                                Dashboard
                            </a>
                        </NavText>
                    </NavItem>

                    <NavItem eventKey="Whistle" onClick={moveLink2}>
                        <NavIcon>
                            <a href='/card_list'><img src="/asset/whistle.png" width={'20px'} /></a>
                        </NavIcon>
                        <NavText>
                            <a href='/card_list'>Whistle</a>
                        </NavText>
                    </NavItem>

                    <NavItem eventKey="Investigator" onClick={moveLink3}>
                        <NavIcon>
                            <a href='/investigator'>
                                <img src="/asset/users.png" width={'20px'} />
                            </a>
                        </NavIcon>
                        <NavText>
                            <a href='/investigator'>
                                Investigator
                            </a>
                        </NavText>
                    </NavItem>
                    
                    <NavItem eventKey="Logout">
                        <NavIcon>
                            <a href='/logout'>
                                <img src="/asset/logout.png" width={'20px'} />
                            </a>
                        </NavIcon>
                        <NavText>
                            <a href='/logout'>
                                Logout
                            </a>
                        </NavText>
                    </NavItem>
                </SideNav.Nav>
            </SideNav>
        </div>
    )
}

export default Sidebar