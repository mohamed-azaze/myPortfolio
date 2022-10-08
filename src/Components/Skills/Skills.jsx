import { useEffect } from "react";
import Heading from "../Heading/Heading"
import Style from "./Skills.module.css"
import AOS from 'aos';
import 'aos/dist/aos.css';
import { SiJavascript } from "react-icons/si"
import { VscJson } from "react-icons/vsc"
import { MdApi } from "react-icons/md"
import { TbBrandNextjs } from "react-icons/tb"
import {
    FaHtml5,
    FaCss3Alt,
    FaSass,
    FaReact,
    FaNode,
} from "react-icons/fa"



const Skills = () => {


    useEffect(() => {
        AOS.init({ duration: 1000 });

    }, [])
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
                        <li data-aos="zoom-in">
                            <FaHtml5 className={`${Style["s-icon"]} ${Style.html}`} />
                            HTML5
                        </li>
                        <li data-aos="zoom-in">
                            <FaCss3Alt className={`${Style["s-icon"]} ${Style.css}`} />
                            CSS3
                        </li>
                        <li data-aos="zoom-in">
                            <SiJavascript className={`${Style["s-icon"]} ${Style.javascript}`} />
                            JavaScript
                        </li>
                        <li data-aos="zoom-in">
                            <FaSass className={`${Style["s-icon"]} ${Style.sass}`} />
                            Sass
                        </li>
                        <li data-aos="zoom-in">
                            <VscJson className={`${Style["s-icon"]} ${Style.es6}`} />
                            ES6
                        </li>
                        <li data-aos="zoom-in">
                            <VscJson className={`${Style["s-icon"]} ${Style.json}`} />
                            Json
                        </li>
                        <li data-aos="zoom-in">
                            <MdApi className={`${Style["s-icon"]} ${Style.ajax}`} />
                            AJAX
                        </li>
                        <li data-aos="zoom-in">
                            <FaReact className={`${Style["s-icon"]} ${Style.react}`} />
                            React
                        </li>
                        <li data-aos="zoom-in">
                            <TbBrandNextjs className={`${Style["s-icon"]} ${Style.next}`} />
                            Next
                        </li>
                        <li data-aos="zoom-in">
                            <FaNode className={`${Style["s-icon"]} ${Style.node}`} />
                            Node Express
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Skills