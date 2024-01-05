import { useEffect, useState } from "react";
import axiosClient from '../../axios_client'
import Heading from "../Heading/Heading"
import Style from "./Skills.module.css"
import AOS from 'aos';
import 'aos/dist/aos.css';



const Skills = () => {
    const [languages, setLanguages] = useState([]);

    useEffect(() => {
        AOS.init({ duration: 1000 });
        getLangAndTool()
    }, [])

    const getLangAndTool = () => {
        axiosClient.get("lang-tool").then(({ data }) => {
            setLanguages(data)
        })
    }

    const allLangs = languages.map((lang) => (
        <li data-aos="zoom-in" key={lang.id}>
            <i className={lang.icon_classes} style={{ color: `${lang.color}` }}></i>
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