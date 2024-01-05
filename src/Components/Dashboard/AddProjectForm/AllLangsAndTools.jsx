import { useEffect, useState } from 'react'
import axiosClient from '../../../axios_client'
import Style from './AddProjectForm.module.css'

const AllLangsAndTools = ({ getValue, langs }) => {
    const [skills, setSkills] = useState([]);

    useEffect(() => {
        getAllSkills();
        const checkInput = document.querySelectorAll("input[type='checkbox']");
        const languages = langs
        for (let i = 0; i < checkInput.length; i++) {
            for (let j = 0; j < languages.length; j++) {
                if (checkInput[i].value === languages[j]) {
                    checkInput[i].checked = true
                }
            }
        }
    }, [langs])

    const getAllSkills = () => {
        axiosClient.get("/lang-tool").then(({ data }) => {
            setSkills(data)
        })
    }

    const viewSkills = skills.map(skill => (
        <div className={`${Style['check-form']}`} key={skill.id}>
            <input
                onChange={getValue}
                type="checkbox"
                value={skill.name.toLowerCase()}
                id={skill.name.toLowerCase()} />
            <label htmlFor={skill.name.toLowerCase()}>
                {skill.name}
            </label>
        </div>
    ))

    return (
        <>
            {viewSkills}
        </>
    )
}

export default AllLangsAndTools