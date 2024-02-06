import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Style from './Dashboard.module.css'
import DashboardHeader from './DashboardHeader/DashboardHeader'
import DashboardNav from './DashboardNav/DashboardNav'
import { IoCloseSharp } from 'react-icons/io5'
import { IoIosMenu } from 'react-icons/io'
import Title from "../Title/Title";
import { useStateContext } from '../../context/ContextProvider'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../Firebase'

const Dashboard = () => {
    Title("Dashboard")
    const { notification, token, setToken } = useStateContext()
    const [navIcon, serNavIcon] = useState(null)
    const [navActive, setNavActive] = useState(localStorage.getItem("DASH_NAV_ACTIVE"))
    const navigate = useNavigate()

    if (!token) {
        navigate('/login')
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (!user) {
                setToken(null)
            }
        })
        if (localStorage.getItem("DASH_NAV_ACTIVE") === null) {
            setNavActive("active")
            serNavIcon(<IoCloseSharp />)
        }
        if (localStorage.getItem("DASH_NAV_ACTIVE") === 'active') {
            serNavIcon(<IoCloseSharp />)
        }
        if (localStorage.getItem("DASH_NAV_ACTIVE") === '') {
            serNavIcon(<IoIosMenu />)
        }
    }, [setToken])

    const openCloseMenu = () => {
        if (navActive === 'active') {
            setNavActive("")
            serNavIcon(<IoIosMenu />)
            localStorage.setItem("DASH_NAV_ACTIVE", "")
        } else {
            setNavActive("active")
            serNavIcon(<IoCloseSharp />)
            localStorage.setItem("DASH_NAV_ACTIVE", "active")
        }
    }
    return (
        <>
            {notification &&
                <div className='notification'>
                    {notification}
                </div>
            }
            <div className={`${Style['dashboard-container']}`}>
                <div className={`${Style['dash-header']}`}>
                    <DashboardHeader />
                </div>
                <div className={`${Style['dash-nav-content']}`}>
                    <div className={`${Style['dash-nav']} ${Style[navActive]}`}>
                        <div
                            onClick={() => openCloseMenu()}
                            className={`${Style['dash-nav-icon']} ${Style[navActive]}`}>
                            {navIcon}
                        </div>
                        <DashboardNav />
                    </div>
                    <div className={`${Style['dash-content']}`}>
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )
}
export default Dashboard