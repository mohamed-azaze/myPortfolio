import { useEffect, useState } from "react"
import Card from "../Card/Card.jsx"
import Heading from "../Heading/Heading.jsx"
import Skills from "../Skills/Skills.jsx"
import Style from "./About.module.css"
import Title from "../Title/Title";


const About = () => {
    Title("About Me-Azaze")
    //Show Card 
    const [showCard, setShowCard] = useState("");
    useEffect(() => {
        setShowCard("show")
    }, [])
    ////////////////////////////

    return (
        <>
            <div className={Style["a-container"]}>
                <div style={{ paddingTop: "100px", paddingBottom: "30px", overflow: "hidden" }}>
                    <Heading
                        heading={"ABOUT"}
                        headingSpan={"ME"}
                        backSpan={"RESUME"}
                    />
                </div>
                {/* Start PERSONAL INFO  */}
                <div className={Style["a-cards-contianer"]}>
                    <div className={Style["a-cards"]}>
                        <Card
                            heading={"PERSONAL INFOS"}
                            one={"Name: Mohamed Al Azaze"}
                            two={"Phone: 01555035545"}
                            three={"Address: Egypt, Cairo"}
                            four={"Email: m.ali.alazaze@gmail.com"}
                            className={"info-card"}
                            showCard={showCard}
                        />
                        <Card
                            heading={"SUMMARY"}
                            one={`Full Stack Developer who is passionate about programming and building fully responsive, SEO friendly
                            applications written with clean code in clean architecture for best performance, using new technologies at all
                            levels of difficulty.`}
                            // two={"I have less than 1 Year of Experience and a Solid Background in Web Development."}
                            className={"summary-card"}
                        />
                        <Card
                            heading={"EDUCATION"}
                            one={"Faculty: Management Information System, New Cairo Academy"}
                            two={"Degree: Bachelor's degree, Information System"}
                            className={"education-card"}
                        />
                        <Card
                            heading={"EXPERIENCE"}
                            one={`Technical Support Specialist`}
                            two={`-- TE-Data`}
                            three={"-- From 5/2017 To 2/2021"}
                            className={"experience-card"}
                        />
                        <Card
                            heading={"Technical Skills"}
                            one={`Good command of both written & spoken English.`}
                            two={`Good communication skills with strong analytical and organizational skills.`}
                            three={"Ability and willingness for self-learning and to being up to date and new technologies."}
                            // four={"Self-motivated, hard worker, independent and detail oriented."}
                            className={"skills-card"}
                        />
                        <Card
                            heading={"Projects"}
                            one={`- School management system with laravel.`}
                            two={`- Building a website for books readers using php, mysql.`}
                            three={"- E-commerce website using React & Redux, Redux Toolkit, Redux thunk with all necessary functionalities."}
                            className={"projects-card"}
                        />
                    </div>


                </div>
                {/* End PERSONAL INFO  */}
                <div className="clear"></div>
            </div >
            {/* Start Skills */}
            <div className={Style["a-skills-container"]}>
                <Skills />
            </div>
            {/* End Skills */}
        </>
    )
}

export default About