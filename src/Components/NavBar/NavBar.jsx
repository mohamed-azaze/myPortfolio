import { useState } from 'react';
import { NavLink } from 'react-router-dom'
import Style from "./NavBar.module.css";
import { FaBars } from "react-icons/fa"




const NavBar = () => {
    const [activeCLass, setActiveClass] = useState("")
    const showMenu = () => {
        if (activeCLass === "") {
            setActiveClass("active")
        } else {

            setActiveClass("")
        }
    }
    const removeActive = () => {
        setActiveClass("")
    }
    return (
        <>
            <div className={Style.container}>
                <div className={Style["n-logo"]}>
                    <h3>Azaze</h3>
                </div>
                <nav>
                    <div
                        onClick={() => showMenu()}
                        className={Style["n-icon"]}
                    >
                        <FaBars
                            style={{ fontSize: "35px" }}
                        />
                    </div>
                    <div className={`${Style["n-links"]} ${Style[activeCLass]}`}>
                        <NavLink
                            onClick={() => removeActive()}
                            to="/myportfolio" >
                            Home
                        </NavLink>
                        <NavLink
                            onClick={() => removeActive()}
                            to="myportfolio/about">
                            About
                        </NavLink>
                        <NavLink
                            onClick={() => removeActive()}
                            to="myportfolio/portfolio">
                            Portfolio
                        </NavLink>
                        <NavLink
                            onClick={() => removeActive()}
                            to="myportfolio/contact">
                            Contact
                        </NavLink>
                        <NavLink
                            onClick={() => removeActive()}
                            to="myportfolio/dashboard">
                            Dashboard
                        </NavLink>
                    </div>
                </nav>
            </div>
        </>
    )
}

export default NavBar