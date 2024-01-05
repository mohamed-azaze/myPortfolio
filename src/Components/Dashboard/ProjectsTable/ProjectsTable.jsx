import { useEffect } from 'react'
import Style from './ProjectsTable.module.css'
import axiosClient from '../../../axios_client'
import { useState } from 'react'
import { Link } from 'react-router-dom'
const ProjectsTable = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        return () => {

            getAllProject()

        }
    }, [])

    const getAllProject = () => {
        setLoading(true)
        axiosClient.get("/projects").then(({ data }) => {
            setProjects(data)
            setLoading(false)
        }).catch(errors => {

            const response = errors.response;
            setLoading(false)
            console.log(response)
        })
    }

    const deleleProject = (projectId) => {
        if (!window.confirm("Are you sure you want to delete this Project")) {
            return
        }
        axiosClient.delete(`projects/${projectId}`).then(() => {
            getAllProject()
        })
    }

    const viewProjects = projects.map((project, index) => (
        <tr key={project.id}>
            <th>{index + 1}</th>
            <td>{project.name}</td>
            <td className={`${Style['project_url']}`}>
                <div>
                    <Link to={project.url} target='_blank'>Live Preview</Link>

                </div>
            </td>
            <td className={`${Style['project_full_image']}`}>
                <img src={`http://localhost:8000/storage/projects/${project.name}/${project.full_image}`} alt="" />
            </td>
            <td className={`${Style['project_banner_image']}`}>
                <img src={`http://localhost:8000/storage/projects/${project.name}/${project.banner_image}`} alt="" />
            </td>
            <td>
                <ul>
                    {JSON.parse(project.languages).map((lang, index) => (
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
                                {loading &&
                                    <tr>
                                        <td colSpan={7} className={`${Style['loading']}`}>Loading...</td>
                                    </tr>
                                }
                                {!loading &&

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