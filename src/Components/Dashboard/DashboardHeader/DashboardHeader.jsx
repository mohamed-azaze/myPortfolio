/* eslint-disable jsx-a11y/anchor-is-valid */
import { NavLink } from 'react-router-dom'
import Style from './DashboardHeader.module.css'
import './DashboardHeader.module.css'
import axiosClient from '../../../axios_client';
import { useStateContext } from '../../../context/ContextProvider';
import { useEffect } from 'react';

const DashboardHeader = () => {
    const { setUser, setToken, user } = useStateContext()

    useEffect(() => {
        axiosClient.get('/user').then(({ data }) => {
            setUser(data)
        })
    }, [])
    const onLogOut = (e) => {
        e.preventDefault();
        axiosClient.post('logout').then(() => {
            setUser({})
            setToken(null)
        })
    }
    return (
        <>
            <div className={`${Style['dash-header-container']}`}>
                <div className={`${Style['username']}`}>
                    {user.name}
                </div>
                <div className={`${Style['dashboard']}`}>
                    <NavLink to={'/dashboard'}>Dashboard</NavLink>
                </div>
                <div className={`${Style['website']}`}>
                    <NavLink to={'/'} target='_blank'>Website</NavLink>
                </div>
                <div className={`${Style['logout']}`}>
                    <a href='#' onClick={onLogOut}>Logout</a>
                </div>
            </div>

        </>
    )
}
export default DashboardHeader