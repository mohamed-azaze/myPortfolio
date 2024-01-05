import { useState } from "react"
import Style from "./Portfolio.module.css"
import Heading from "../Heading/Heading"
import Popup from "../Popup/Popup";
import Title from "../Title/Title"
// Projects Images
import LeadershipShot from "../../imgs/Projects/Leadership-shot.png"
import Leadership from "../../imgs/Projects/Leadership.png"
import azazeShot from "../../imgs/Projects/azaze-shot.png"
import azaze from "../../imgs/Projects/azaze.png"
import portfolio from "../../imgs/Projects/Home.png"
import CRUD from "../../imgs/Projects/CRUD.png"
import ReactEcommerceShot from "../../imgs/Projects/React-E-commerce-shot.png"
import ReactEcommerce from "../../imgs/Projects/React-E-commerce.png"

const Portfolio = () => {
    Title("Portfolio-Azaze")
    const [showPop, setShowPop] = useState("");
    const [project, setProject] = useState({})
    const projects = [
        {
            image: `${Leadership}`,
            name: "leadership",
            lang: `HTML5, CSS3, Javascript`,
            link: "https://mohamed-azaze.github.io/leadership_event/"
        },
        {
            image: `${azaze}`,
            name: "azaze",
            lang: `HTML5, CSS3`,
            link: "https://mohamed-azaze.github.io/Azazy/"
        },
        {
            image: `${portfolio}`,
            name: "portfolio",
            lang: `React.js`,
            link: "https://mohamed-azaze.github.io/myPortfolio"
        },
        {
            image: `${CRUD}`,
            name: "CRUD",
            lang: `HTML5, CSS3, JavaScript`,
            link: "https://mohamed-azaze.github.io/CRUD-App/"
        },
        {
            image: `${ReactEcommerce}`,
            name: "React-E-commerce",
            lang: `React, Redux Toolkit, Redux AsyncThunk, Json Server`,
            link: "https://mohamed-azaze.github.io/React-E-commerce/"
        },
    ]
    /////////////////////////////////
    const popupHandler = (e) => {

        setShowPop("pop-show");
        // eslint-disable-next-line array-callback-return
        const projectData = projects.filter(ele => {
            if (ele.name === e.target.parentElement.dataset.name) {
                return ele
            }
        });
        setProject(...projectData)
    }

    const closePop = () => {
        setShowPop("")
    }

    return (
        <>
            <div className={`${Style["p-container"]} container`}>
                <div style={{ paddingTop: "100px", paddingBottom: "50px", overflow: "hidden" }}>
                    <Heading
                        heading={"MY"}
                        headingSpan={"PROJECTS"}
                        backSpan={"PORTFOLIO"}
                    />
                </div>
                <div className={Style["p-projects"]}>
                    <ul>
                        <li onClick={popupHandler} data-name="leadership">
                            <img src={LeadershipShot} alt="img" />
                        </li>
                        <li onClick={popupHandler} data-name="azaze">
                            <img src={azazeShot} alt="img" />
                        </li>
                        <li onClick={popupHandler} data-name="portfolio">
                            <img src={portfolio} alt="img" />
                        </li>
                        <li onClick={popupHandler} data-name="CRUD">
                            <img src={CRUD} alt="img" />
                        </li>
                        <li onClick={popupHandler} data-name="React-E-commerce">
                            <img src={ReactEcommerceShot} alt="img" />
                        </li>
                    </ul>
                </div>
            </div>
            <div className={`${Style["p-pop-container"]} ${Style[showPop]}`}>
                <Popup closePop={closePop} project={project} />
            </div>
        </>
    )
}


export default Portfolio