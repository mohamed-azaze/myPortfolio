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
        setShowCard("c-show-card")
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
                            heading={"SUMMARY"}
                            one={"Front-End Developer who is passionate about programming and building fully responsive, SEO friendly applications written with clean code in clean architecture for best performance, using new technologies at all levels of difficulty."}
                            // two={"I have less than 1 Year of Experience and a Solid Background in Web Development."}
                            positionClass={"c-card-1"}
                            showClass={showCard}
                        />
                        <Card
                            heading={"PERSONAL INFOS"}
                            one={"Name: Mohamed Al Azaze"}
                            two={"Phone: 01555035545"}
                            three={"Address: Egypt, Cairo"}
                            four={"Email: m.ali.alazaze@gmail.com"}
                            positionClass={"c-card-2"}
                            showClass={showCard}
                        />
                        <Card
                            heading={"EDUCATION"}
                            one={"Faculty: Management Information System, New Cairo Academy"}
                            two={"Degree: Bachelor's degree, Information System"}
                            positionClass={"c-card-3"}
                            showClass={showCard}
                        />
                        <Card
                            heading={"EXPERIENCE"}
                            one={`Technical Support Specialist `}
                            two={`-- TE-Data`}
                            three={"-- From 5/2017 To 2/2021"}
                            positionClass={"c-card-4"}
                            showClass={showCard}
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