import { NavLink } from 'react-router-dom'
import Style from './DashboardNav.module.css'
import { PiFolderSimplePlus } from "react-icons/pi";

const DashboardNav = () => {
    return (
        <>
            <div className={`${Style['dash-nav-container']} `}>
                <nav>
                    <NavLink to={'add_project'} >
                        <div className={`${Style['add-project-icon']}`}>
                            <PiFolderSimplePlus />
                        </div>
                        <span>Add Project</span>
                    </NavLink>
                    <NavLink to={'add_lang_tool'}>
                        <div className={`${Style['add-project-icon']}`}>
                            <PiFolderSimplePlus />
                        </div>
                        <span>Add Lang&Skill</span>
                    </NavLink>
                </nav>
            </div>
        </>
    )
}
export default DashboardNav