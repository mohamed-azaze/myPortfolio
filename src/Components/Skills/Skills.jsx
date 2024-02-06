import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getLangOrToolfunc } from "../../Store/createLangAnfToolSlice";
import Heading from "../Heading/Heading"
import Style from "./Skills.module.css"
import AOS from 'aos';
import 'aos/dist/aos.css';



const Skills = () => {
    const { LangOrToolData } = useSelector(state => state.addLangOrTool)
    const dispatch = useDispatch()

    useEffect(() => {
        AOS.init({ duration: 1000 });
        dispatch(getLangOrToolfunc())
    }, [dispatch])


    const allLangs = LangOrToolData.map((lang) => (
        <li data-aos="zoom-in" key={lang.id}>
            <img src={lang.icon} alt={lang.name} />
            {lang.name}
        </li>
    ))

    return (
        <>
            <div className={Style["s-container"]} >
                <div>
                    <Heading
                        heading={"MY"}
                        headingSpan={"SKILLS"}
                    />
                </div>
                <div className={Style["s-skills-container"]}>
                    <ul>
                        {allLangs}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Skills