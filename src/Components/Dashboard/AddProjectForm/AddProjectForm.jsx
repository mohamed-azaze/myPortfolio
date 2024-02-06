import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from '../../../Firebase';
import { useStateContext } from '../../../context/ContextProvider';
import { getProjectsFunc } from '../../../Store/projectsSlice';
import Style from './AddProjectForm.module.css'
import Title from "../../Title/Title";
import AllLangsAndTools from './AllLangsAndTools';




const AddProjectForm = () => {
    Title('Add Project')
    const { id } = useParams();
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { projectsData } = useSelector(state => state.getProjects)
    const { notification, setNotification } = useStateContext()
    const [errors, setErrors] = useState([])
    const [uploading, setUploading] = useState(false)
    const [langs, setLangs] = useState([])
    const [fullImgUrl, setFullImgUrl] = useState(null);
    const [bannerImgUrl, setBannerImgUrl] = useState(null);
    // eslint-disable-next-line no-unused-vars
    const [currectProject, setCurrectProject] = useState(projectsData.filter(proj => proj.id === id))
    const [project, setProject] = useState({
        id: null,
        name: null,
        url: null,
        full_image: null,
        banner_image: null,
    })
    useEffect(() => {
        dispatch(getProjectsFunc())

        const checkInput = document.querySelectorAll("input[type='checkbox']");
        if (id) {
            setProject({
                id: currectProject[0].id,
                name: currectProject[0].name,
                url: currectProject[0].url,
            })
            setLangs(currectProject[0].languages)
        } else {
            checkInput.forEach(input => {
                if (input.checked === true) {
                    input.checked = false
                }
            })
            setProject({
                id: null,
                name: null,
                url: null,
                full_image: null,
                banner_image: null,
            })
            setLangs([])
            document.querySelector("#full_image").value = ''
            document.querySelector("#banner_image").value = ''

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, errors])


    useEffect(() => {
        if (fullImgUrl && bannerImgUrl) {
            if (project.id) {
                const docRef = doc(db, 'Projects', project.id);
                updateDoc(docRef, {
                    name: project.name,
                    url: project.url,
                    full_image: fullImgUrl,
                    banner_image: bannerImgUrl,
                    languages: langs,
                    updated_at: Date("dd-mm-yyyy")
                })
                    .then(() => {
                        setUploading(false)
                        const checkInput = document.querySelectorAll("input[type='checkbox']")
                        checkInput.forEach(input => {
                            if (input.checked === true) {
                                input.checked = false
                            }
                        })
                        setProject({})
                        setErrors([])
                        setFullImgUrl(null)
                        setBannerImgUrl(null)
                        setNotification("Project Edited Successfully")
                        navigate("/dashboard")
                    }).catch((error) => {
                        console.log(error.message)
                    })
            } else {
                const collectionName = collection(db, 'Projects');
                addDoc(collectionName,
                    {
                        name: project.name,
                        url: project.url,
                        full_image: { url: fullImgUrl, path: project.full_image.name },
                        banner_image: { url: bannerImgUrl, path: project.banner_image.name },
                        languages: langs,
                        created_at: Date("dd-mm-yyyy")
                    })
                    .then(() => {
                        setUploading(false)
                        const checkInput = document.querySelectorAll("input[type='checkbox']")
                        checkInput.forEach(input => {
                            if (input.checked === true) {
                                input.checked = false
                            }
                        })
                        setProject({})
                        setErrors([])
                        setFullImgUrl(null)
                        setBannerImgUrl(null)
                        setNotification("Project Added Successfully")

                    }).catch((error) => {
                        console.log(error.message)
                    })
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fullImgUrl, bannerImgUrl])



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
        for (const key in project) {
            if (key === "full_image" || key === "banner_image") {
                if (project[key] === null) {
                    errors[key] = [`${key} Is Required`];
                } else {
                    errors[key] = null;
                }
            } else {
                if (project[key] === null || project[key].trim() === "") {
                    errors[key] = [`${key} Is Required`];
                } else {
                    errors[key] = null;
                }
            }
        }
        if (langs.length === 0) {
            errors["languages"] = ["Languages is Required"]
        } else {
            errors["languages"] = null
        }
        if (project.id) {
            // eslint-disable-next-line array-callback-return
            const projectExists = projectsData.filter(proj => {
                if (proj.id !== project.id && proj.name === project.name) {
                    return proj;
                }
            })

            if (projectExists.length === 0) {
                if (errors.length === 0) { setUploading(true) }

                if (project.full_image) {
                    const fileRef = ref(storage,
                        `projects/${String(currectProject[0].full_image.path)}`);
                    deleteObject(fileRef)
                    const full_image = ref(storage, `projects/${project.full_image.name}`)
                    uploadBytes(full_image, project.full_image).then(async (res) => {
                        await getDownloadURL(res.ref).then((url) => {
                            const theUrl = url

                            setFullImgUrl({ url: theUrl, path: project.full_image.name })
                        })
                    }).catch((error) => {
                        console.log("something went wrong" + error)
                    })
                } else {
                    setFullImgUrl(currectProject[0].full_image)

                }
                if (project.banner_image) {
                    const fileRef = ref(storage,
                        `projects/${String(currectProject[0].banner_image.path)}`);
                    deleteObject(fileRef)
                    const banner_image = ref(storage, `projects/${project.banner_image.name}`)
                    uploadBytes(banner_image, project.banner_image).then(async (res) => {
                        await getDownloadURL(res.ref).then((url) => {
                            const theUrl = url
                            setBannerImgUrl({ url: theUrl, path: project.banner_image.name })

                        })
                    }).catch((error) => {
                        console.log("something went wrong" + error)
                    })
                } else {
                    setBannerImgUrl(currectProject[0].banner_image)

                }
            } else {
                errors["name"] = ["Project Name is Exists"]
            }
        } else {
            // eslint-disable-next-line array-callback-return
            const projectExists = projectsData.filter((proj) => {
                if (proj.name === project.name) {
                    return proj
                }
            })
            if (projectExists.length === 0) {
                if (errors.length === 0) { setUploading(true) }
                const full_image = ref(storage, `projects/${project.full_image.name}`)
                uploadBytes(full_image, project.full_image).then(async (res) => {
                    await getDownloadURL(res.ref).then(async (url) => {
                        setFullImgUrl(url)
                    })
                }).catch((error) => {
                    console.log("something went wrong" + error)
                })
                const banner_image = ref(storage, `projects/${project.banner_image.name}`)
                uploadBytes(banner_image, project.banner_image).then(async (res) => {
                    await getDownloadURL(res.ref).then(async (url) => {
                        setBannerImgUrl(url)
                    })
                }).catch((error) => {
                    console.log("something went wrong" + error)
                })
            } else {
                errors["name"] = ["Project Name is Exists"]
            }
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
                        {project.id &&

                            <h2>Update Project</h2>
                        }{!project.id &&

                            <h2>Add Project</h2>
                        }
                    </div>
                    <form onSubmit={(e) => onSubmit(e)} className={`${Style['add-project-form']}`} encType='multipart/form-data'>
                        <label htmlFor="name">Project Name</label>
                        <input
                            onChange={(e) => setProject({ ...project, name: e.target.value })}
                            type="text"
                            name='name'
                            value={project.name ? project.name : ""}
                            id='name'
                            placeholder="Project Name"

                        />
                        {errors['name'] &&
                            <>
                                <div className='error-message'>
                                    <span>*</span>
                                    {errors['name']}
                                </div>
                            </>
                        }
                        <label htmlFor="url">Website URL</label>
                        <input
                            onChange={(e) => setProject({ ...project, url: e.target.value })}
                            type="text"
                            name='url'
                            value={project.url ? project.url : ""}
                            id='url'
                            placeholder="http://example.com"

                        />
                        {errors['url'] &&
                            <>
                                <div className='error-message'>
                                    <span>*</span>
                                    {errors['url']}
                                </div>
                            </>
                        }
                        <label htmlFor="full_image">Website Image</label>
                        <input
                            onChange={(e) => setProject({ ...project, full_image: e.target.files[0] })}
                            accept="image/*"
                            type="file"
                            name="full_image"
                            id="full_image"

                        />
                        {errors['full_image'] &&
                            <>
                                <div className='error-message'>
                                    <span>*</span>
                                    {errors['full_image']}
                                </div>
                            </>
                        }
                        <label htmlFor="banner_image">Banner Image</label>
                        <input
                            onChange={(e) => setProject({ ...project, banner_image: e.target.files[0] })}
                            type="file"
                            accept="image/*"
                            name="banner_image"
                            id="banner_image"

                        />
                        {errors['banner_image'] &&
                            <>
                                <div className='error-message'>
                                    <span>*</span>
                                    {errors['banner_image']}
                                </div>
                            </>
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

                        {uploading ?
                            <button
                                className={`${Style['loading-button']}`}>
                                <div className={`${Style['icon']}`} >
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>

                                </div>
                            </button>
                            :
                            <button
                                className={`${Style['add-project-button']}`}>
                                Save Project
                            </button>
                        }

                    </form>
                </div>
            </div>
        </>
    )
}
export default AddProjectForm