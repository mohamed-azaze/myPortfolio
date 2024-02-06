import { useEffect } from 'react'
import Style from './AddProjectForm.module.css'
import { useDispatch, useSelector } from "react-redux"
import { getLangOrToolfunc } from '../../../Store/createLangAnfToolSlice';

const AllLangsAndTools = ({ getValue, langs }) => {
    const { LangOrToolData } = useSelector(state => state.addLangOrTool)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getLangOrToolfunc())
        const checkInput = document.querySelectorAll("input[type='checkbox']");
        const languages = langs
        for (let i = 0; i < checkInput.length; i++) {
            for (let j = 0; j < languages.length; j++) {
                if (checkInput[i].value === languages[j]) {
                    checkInput[i].checked = true
                }
            }
        }
    }, [dispatch, langs])



    const viewSkills = LangOrToolData.map((skill, index) => (
        <div className={`${Style['check-form']}`} key={index}>
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