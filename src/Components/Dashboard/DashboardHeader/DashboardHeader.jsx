/* eslint-disable jsx-a11y/anchor-is-valid */
import { NavLink } from 'react-router-dom'
import { useStateContext } from '../../../context/ContextProvider';
import { signOut } from 'firebase/auth';
import { auth } from '../../../Firebase';
import Style from './DashboardHeader.module.css'
import './DashboardHeader.module.css'

const DashboardHeader = () => {
    const { setUser, setToken, user } = useStateContext()
    const onLogOut = (e) => {
        e.preventDefault();

        signOut(auth).then(() => {
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
                    <NavLink to={'/myportfolio/dashboard'}>Dashboard</NavLink>
                </div>
                <div className={`${Style['website']}`}>
                    <NavLink to={'/myportfolio'} target='_blank'>Website</NavLink>
                </div>
                <div className={`${Style['logout']}`}>
                    <a href='#' onClick={onLogOut} >Logout</a>
                </div>
            </div>

        </>
    )
}
export default DashboardHeader