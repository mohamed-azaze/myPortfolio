import { useEffect, useState } from 'react'
import Style from './LangsandToolsTable.module.css'
import axiosClient from '../../../axios_client'
import { Link } from 'react-router-dom'
const LangsandToolsTable = () => {

  const [langsTools, setLangsTools] = useState([]);
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    return () => {
      getAllLangandTool()
    }
  }, [])

  const getAllLangandTool = () => {
    setLoading(true)
    axiosClient.get("/lang-tool").then(({ data }) => {
      setLangsTools(data)
      setLoading(false)
    }).catch(errors => {
      const response = errors.response;
      setLoading(false)
      console.log(response)
    })
  }


  const delelelang = (langId) => {
    if (!window.confirm("Are you sure you want to delete this Language")) {
      return
    }
    axiosClient.delete(`lang-tool/${langId}`).then(() => {
      getAllLangandTool()
    })
  }



  const viewLangandTool = langsTools.map((lang, index) => (
    <tr key={lang.id}>
      <th>{index + 1}</th>
      <td>{lang.name}</td>
      <td className={`${Style['lang_icon']}`}>
        <i className={`${lang.icon_classes}`} style={{ color: `${lang.color}` }}></i>
      </td>
      <td style={{ backgroundColor: `${lang.color}` }}>
        {lang.color}
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
                  <th>Icon Color</th>
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