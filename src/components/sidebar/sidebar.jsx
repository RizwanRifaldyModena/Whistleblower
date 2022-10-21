import React from 'react'
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import './sidebar.scss'

const Sidebar = () => {
    const username = localStorage.getItem('username');
    return (
        <div>
            <SideNav
                onSelect={(selected) => {
                    // Add your code here
                }}
            >
                <SideNav.Toggle />
                
                <SideNav.Nav defaultSelected="home">
                    
                    <NavItem eventKey="home">
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
                    <NavItem eventKey="Dashboard">
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

                    <NavItem eventKey="Whistle">
                        <NavIcon>
                            <a href='/card_list'><img src="/asset/whistle.png" width={'20px'} /></a>
                        </NavIcon>
                        <NavText>
                            <a href='/card_list'>Whistle</a>
                        </NavText>
                    </NavItem>

                    <NavItem eventKey="Investigator">
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