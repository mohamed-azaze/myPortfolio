import { useState } from 'react';
import Style from './AddProjectForm.module.css'
import Title from "../../Title/Title";
import axiosClient from '../../../axios_client';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import AllLangsAndTools from './AllLangsAndTools';
import { useStateContext } from '../../../context/ContextProvider';


const AddProjectForm = () => {
    Title('Add Project')
    const { id } = useParams();
    const navigate = useNavigate()
    const { notification, setNotification } = useStateContext()
    const [errors, setErrors] = useState([])
    const [projectId, setid] = useState(null)
    const [projectName, setName] = useState('');
    const [url, setUrl] = useState('');
    const [fullImage, setFullImage] = useState('');
    const [bannerImage, setBannerImage] = useState('');
    const [langs, setLangs] = useState([])
    const [project, setProject] = useState({})
    useEffect(() => {
        const checkInput = document.querySelectorAll("input[type='checkbox']");
        if (id) {
            axiosClient.get(`/projects/${id}`).then(({ data }) => {
                setProject(data)
                setName(data.name)
                setUrl(data.url)
                setLangs(JSON.parse(data.languages))
                setid(data.id)
            }).catch((errors) => {
                console.log(errors)
            })
        } else {
            checkInput.forEach(input => {
                if (input.checked === true) {
                    input.checked = false
                }
            })
            setName('')
            setUrl('')
            setid(null)
            document.querySelector("#full_image").value = ''
            document.querySelector("#banner_image").value = ''
        }
    }, [id])



    const getValue = (e) => {
        const { checked, value } = e.target;
        if (checked) {
            setLangs([...langs.filter(lang => lang !== value), value])
        } else {
            setLangs([...langs.filter(lang => lang !== value)])
        }
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('id', projectId && projectId)
        formData.append('name', projectName);
        formData.append('url', url);
        formData.append('full_image', fullImage ? fullImage : project.full_image);
        formData.append('banner_image', bannerImage ? bannerImage : project.banner_image);
        formData.append('languages', langs.length > 0 ? JSON.stringify(langs) : "");
        if (projectId) {
            formData.append('_method', 'put')
            await axiosClient.post(`/projects/${projectId}`, formData).then(() => {
                setNotification("Project Edited Successfully")
                navigate('/dashboard')
            }).catch(error => {
                const response = error.response;
                if (response && response.status === 500) {
                    console.log(response.data.message)
                }
                if (response && response.status === 422) {
                    setErrors(response.data.errors)
                }
            })
        } else {
            await axiosClient.post(`/projects`, formData).then((res) => {
                const allInputs = Array.from(e.target.children)
                allInputs.forEach(input => {
                    if (input.nodeName === 'INPUT') {
                        input.value = ''
                    }
                })
                const checkInput = document.querySelectorAll("input[type='checkbox']")
                checkInput.forEach(input => {
                    if (input.checked === true) {
                        input.checked = false
                    }
                })
                setErrors([])
                setName("");
                setUrl("")
                setFullImage("")
                setBannerImage("")
                setLangs([])
            }).catch(error => {
                const response = error.response;
                if (response && response.status === 500) {
                    console.log(response.data.message)
                }
                if (response && response.status === 422) {
                    setErrors(response.data.errors)
                }
            })
        }
    }
    return (
        <>
            {notification &&
                <div className='notification'>
                    {notification}
                </div>
            }
            <div className={`${Style['add-project-container']}`}>
                <div className={`${Style['heading-form-container']}`}>
                    <div className={`${Style['add-project-heading']}`}>
                        {projectId &&

                            <h2>Update Project</h2>
                        }{!projectId &&

                            <h2>Add Project</h2>
                        }
                    </div>
                    <form onSubmit={(e) => onSubmit(e)} className={`${Style['add-project-form']}`} encType='multipart/form-data'>
                        <label htmlFor="name">Project Name</label>
                        <input
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            name='name'
                            value={projectName}
                            id='name'
                            placeholder="Project Name"
                        />
                        {errors['name'] &&
                            errors['name'].map(error => (
                                <>
                                    <div className='error-message'>
                                        <span>*</span>
                                        {error}
                                    </div>
                                </>
                            ))
                        }
                        <label htmlFor="url">Website URL</label>
                        <input
                            onChange={(e) => setUrl(e.target.value)}
                            type="text"
                            name='url'
                            value={url}
                            id='url'
                            placeholder="http://example.com"
                        />
                        {errors['url'] &&
                            errors['url'].map(error => (
                                <>
                                    <div className='error-message'>
                                        <span>*</span>
                                        {error}
                                    </div>
                                </>
                            ))
                        }
                        <label htmlFor="full_image">Website Image</label>
                        <input
                            onChange={(e) => setFullImage(e.target.files[0])}
                            accept="image/*"
                            type="file"
                            name="full_image"
                            id="full_image"
                        />
                        {errors['full_image'] &&
                            errors['full_image'].map(error => (
                                <>
                                    <div className='error-message'>
                                        <span>*</span>
                                        {error}
                                    </div>
                                </>
                            ))
                        }
                        <label htmlFor="banner_image">Banner Image</label>
                        <input
                            onChange={(e) => setBannerImage(e.target.files[0])}
                            type="file"
                            accept="image/*"
                            name="banner_image"
                            id="banner_image"
                        />
                        {errors['banner_image'] &&
                            errors['banner_image'].map(error => (
                                <>
                                    <div className='error-message'>
                                        <span>*</span>
                                        {error}
                                    </div>
                                </>
                            ))
                        }
                        <label htmlFor="lang">Languages</label>
                        <div className={`${Style['check-form-container']}`}>
                            <AllLangsAndTools getValue={getValue} langs={langs} />
                        </div>
                        {errors['languages'] &&
                            <>
                                <div className='error-message'>
                                    <span>*</span>
                                    {errors['languages']}
                                </div>
                            </>
                        }
                        <button
                            className={`${Style['add-project-button']}`}>
                            Save Project
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}
export default AddProjectForm