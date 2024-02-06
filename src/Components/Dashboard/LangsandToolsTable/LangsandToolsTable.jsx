import { useEffect } from 'react'
import Style from './LangsandToolsTable.module.css'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { getLangOrToolfunc } from '../../../Store/createLangAnfToolSlice'
import { deleteDoc, doc } from 'firebase/firestore'
import { db } from '../../../Firebase'



const LangsandToolsTable = () => {
  const { LangOrToolData, isLoading } = useSelector((state) => state.addLangOrTool)

  const dispatch = useDispatch()




  useEffect(() => {
    dispatch(getLangOrToolfunc())
  }, [])



  const delelelang = async (langId) => {
    if (!window.confirm("Are you sure you want to delete this Language")) {
      return
    }
    const docRef = doc(db, "LanguagesAndTools", langId);
    await deleteDoc(docRef)
    dispatch(getLangOrToolfunc())

  }



  const viewLangandTool = LangOrToolData.map((lang, index) => (
    <tr key={lang.id} >
      <th>{index + 1}</th>
      <td>{lang.name}</td>
      <td className={`${Style['lang_icon']}`}>
        <img src={`${lang.icon}`} alt="" />
      </td>
      <td>
        <div className={`${Style['language_button']}`}>

          <Link to={`add_lang_tool/${lang.id}`} className={`${Style['lang_edit']}`}>
            Edit
          </Link>
          &nbsp;
          <button onClick={() => delelelang(lang.id)} className={`${Style['lang_delete']}`}>
            Delete
          </button>
        </div>
      </td>
    </tr>
  ))



  return (
    <>
      <div className={`${Style['langtool_table_container']}`}>
        <div className={`${Style['langtool_heading_table']}`}>
          <div className={`${Style['langtool_heading']}`}>
            <h2>Languages & Tools</h2>
          </div>
          <div className={`${Style['langtool_table']}`}>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Language Name</th>
                  <th>Language Icon</th>
                  <th>Prosses</th>
                </tr>
              </thead>

              <tbody>
                {isLoading &&
                  <tr>
                    <td colSpan={7} className={`${Style['isLoading']}`}>Loading...</td>
                  </tr>
                }
                {!isLoading &&
                  viewLangandTool

                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>)
}

export default LangsandToolsTable