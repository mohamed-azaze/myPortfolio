import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { deleteDoc, doc } from 'firebase/firestore'
import { db } from '../../../Firebase'
import { useDispatch, useSelector } from "react-redux"
import { getProjectsFunc } from '../../../Store/projectsSlice'
import Style from './ProjectsTable.module.css'

const ProjectsTable = () => {
    const { projectsData, isLoading } = useSelector((state) => state.getProjects)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProjectsFunc())
    }, [dispatch])


    const deleleProject = async (projectId) => {
        if (!window.confirm("Are you sure you want to delete this Project")) {
            return
        }
        const docRef = doc(db, "Projects", projectId);
        await deleteDoc(docRef);
        dispatch(getProjectsFunc())

    }

    const viewProjects = projectsData.map((project, index) => (
        <tr key={project.id}>
            <th>{index + 1}</th>
            <td>{project.name}</td>
            <td className={`${Style['project_url']}`}>
                <div>
                    <Link to={project.url} target='_blank'>Live Preview</Link>

                </div>
            </td>
            <td className={`${Style['project_full_image']}`}>
                <img src={`${project.full_image.url}`} alt="" />
            </td>
            <td className={`${Style['project_banner_image']}`}>
                <img src={`${project.banner_image.url}`} alt="" />
            </td>
            <td>
                <ul>
                    {project.languages.map((lang, index) => (
                        <li key={index}>{lang.toUpperCase()}</li>
                    ))}
                </ul>
            </td>
            <td>
                <div className={`${Style['project_button']}`}>

                    <Link to={`add_project/${project.id}`} className={`${Style['project_edit']}`}>
                        Edit
                    </Link>
                    &nbsp;
                    <button onClick={() => deleleProject(project.id)} className={`${Style['project_delete']}`}>
                        Delete
                    </button>
                </div>
            </td>
        </tr>
    ))
    return (
        <>
            <div className={`${Style['project_table_container']}`}>
                <div className={`${Style['project_heading_table']}`}>
                    <div className={`${Style['project_heading']}`}>
                        <h2>Projects</h2>
                    </div>
                    <div className={`${Style['project_table']}`}>
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Project Name</th>
                                    <th>Project URL</th>
                                    <th>Website Image</th>
                                    <th>Banner Image</th>
                                    <th>Languages</th>
                                    <th>Prosses</th>
                                </tr>
                            </thead>

                            <tbody>

                                {isLoading &&
                                    <tr>
                                        <td
                                            colSpan={7}
                                            className={`${Style['loading']}`}
                                        >
                                            Loading...
                                        </td>
                                    </tr>
                                }
                                {!isLoading &&
                                    viewProjects
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ProjectsTable