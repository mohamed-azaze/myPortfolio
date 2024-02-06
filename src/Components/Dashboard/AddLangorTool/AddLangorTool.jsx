import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { useStateContext } from '../../../context/ContextProvider';
import { db } from '../../../Firebase';
import { getLangOrToolfunc } from '../../../Store/createLangAnfToolSlice';
import { useDispatch, useSelector } from "react-redux"

import Title from '../../Title/Title';
import Style from './AddLangorTool.module.css'




const AddLangorTool = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { LangOrToolData } = useSelector(state => state.addLangOrTool)
  const { notification, setNotification } = useStateContext()
  const [errors, setErrors] = useState([])
  // eslint-disable-next-line no-unused-vars
  const [err, setErr] = useState(null)
  const [language, setLanguage] = useState({
    id: null,
    name: null,
    icon: null,
  })

  useEffect(() => {
    Title('Add Langauges or Tools')
    dispatch(getLangOrToolfunc())

    if (id) {
      const currectLang = LangOrToolData.filter(lang => lang.id === id);
      setLanguage(...currectLang)
    } else {

    }

  }, [dispatch, id])


  const onSubmit = async (e) => {
    e.preventDefault();
    for (const key in language) {
      if (language[key] === null || language[key].trim() === "") {
        errors[key] = [`${key} is Required`]
      } else {
        errors[key] = null
      }
    }
    const langExists = LangOrToolData.filter(lang => {
      if (lang.name === language.name.trim()) {
        return lang;
      }
    })
    if (langExists.length === 0) {
      if (language.id) {
        const docRef = doc(db, "LanguagesAndTools", language.id)
        await updateDoc(docRef, {
          name: language.name,
          icon: language.icon,
        }).then(() => {
          for (let i = 0; i < e.target.children.length; i++) {
            if (e.target.children[i].localName === 'input') {
              e.target.children[i].value = ''
            }
          }
          setLanguage({})
          setErrors([])
          setNotification("Language Edited Successfully")
          navigate("/dashboard")
        }).catch((err) => {
          setErr(err)
          console.log(err)
        })
      } else {

        const collectionName = collection(db, 'LanguagesAndTools');
        await addDoc(collectionName, { name: language.name, icon: language.icon })
          .then(() => {
            for (let i = 0; i < e.target.children.length; i++) {
              if (e.target.children[i].localName === 'input') {
                e.target.children[i].value = ''
              }
            }
            setLanguage({})
            setErrors([])
            setNotification("Language Added Successfully")
          }).catch((err) => {
            setErr(err)
            console.log(err)
          })
      }
    } else {
      setErr("err")
      errors['name'] = [`This Languages is Exists`]
    }

  }

  return (
    <>
      {notification &&
        <div className='notification'>
          {notification}
        </div>
      }
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
              <input
                type="text"
                id='name'
                value={language.name}
                onChange={(e) => setLanguage({ ...language, name: e.target.value })}
              />
              {errors['name'] &&
                <>
                  <div className='error-message'>
                    <span>*</span>
                    {errors['name']}
                  </div>
                </>

              }
              <label htmlFor="icon">Icon URL</label>
              <input
                type="text"
                id='icon'
                value={language.icon}
                onChange={(e) => setLanguage({ ...language, icon: e.target.value })} />
              {errors['icon'] &&
                <>
                  <div className='error-message'>
                    <span>*</span>
                    {errors['icon']}
                  </div>
                </>

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