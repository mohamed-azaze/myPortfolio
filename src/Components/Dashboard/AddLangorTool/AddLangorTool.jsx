import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import axiosClient from '../../../axios_client';
import Style from './AddLangorTool.module.css'
import { useStateContext } from '../../../context/ContextProvider';




const AddLangorTool = () => {
  const { id } = useParams();
  const navigate = useNavigate()

  const { notification, setNotification } = useStateContext()
  const [errors, setErrors] = useState([])
  const [language, setLanguage] = useState({
    id: null,
    name: '',
    icon_classes: '',
    color: '',
  })

  useEffect(() => {
    if (id) {
      axiosClient.get(`/lang-tool/${id}`).then(({ data }) => {
        setLanguage(data)
      }).catch((error) => {
        console.log(error)
      })
    } else {
      setLanguage({
        id: null,
        name: '',
        icon_classes: '',
        color: '',
      })
      setErrors([])

    }
  }, [id])


  const onSubmit = (e) => {
    e.preventDefault();

    if (language.id) {
      axiosClient.put(`/lang-tool/${language.id}`, language).then(() => {
        navigate("/dashboard")
        setNotification('Languages Updated successfully')
        for (let i = 0; i < e.target.children.length; i++) {
          if (e.target.children[i].localName === 'input') {
            e.target.children[i].value = ''
          }
        }
        setLanguage({})
        setErrors([])
      }).catch((error) => {
        const response = error.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors)
        }
      })
    } else {
      axiosClient.post('/lang-tool', language).then(() => {
        for (let i = 0; i < e.target.children.length; i++) {
          if (e.target.children[i].localName === 'input') {
            e.target.children[i].value = ''
          }
        }
        setLanguage({})
        setErrors([])
      }).catch((error) => {

        const response = error.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors)
        }

      })
    }
  }


  return (
    <>

      <div className={`${Style['lang_tool_container']}`}>
        <div className={`${Style['heading_form_container']}`}>
          <div className={`${Style['lang_tool_heading']}`}>
            {language.id &&
              <h2>Update Language or Tool</h2>
            }
            {!language.id &&
              <h2>Add Language or Tool</h2>
            }
          </div>
          <div className={`${Style['lang_tool_form']}`}>
            <form onSubmit={(e) => onSubmit(e)}>
              <label htmlFor="name">Language or Tool Name</label>
              <input type="text" id='name' value={language.name} onChange={(e) => setLanguage({ ...language, name: e.target.value })} />
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
              <label htmlFor="icon">Icon Classes</label>
              <input type="text" id='icon' value={language.icon_classes} onChange={(e) => setLanguage({ ...language, icon_classes: e.target.value })} />
              {errors['icon_classes'] &&
                errors['icon_classes'].map(error => (
                  <>
                    <div className='error-message'>
                      <span>*</span>
                      {error}
                    </div>
                  </>
                ))
              }
              <label htmlFor="color">Icon Color</label>
              <input type="text" id='color' value={language.color} onChange={(e) => setLanguage({ ...language, color: e.target.value })} />
              {errors['color'] &&
                errors['color'].map(error => (
                  <>
                    <div className='error-message'>
                      <span>*</span>
                      {error}
                    </div>
                  </>
                ))
              }
              <button
                className={`${Style['add_lang_skill_button']}`}>
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )

}
export default AddLangorTool