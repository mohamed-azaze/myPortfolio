import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getProjectsFunc } from "../../Store/projectsSlice";
import Style from "./Portfolio.module.css"
import Heading from "../Heading/Heading"
import Popup from "../Popup/Popup";
import Title from "../Title/Title"



const Portfolio = () => {
    Title("Portfolio-Azaze")
    const [showPop, setShowPop] = useState("");
    const [project, setProject] = useState({});
    const { projectsData } = useSelector(state => state.getProjects)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProjectsFunc())
    }, [dispatch])

    const allProject = projectsData.map(project => (
        <li onClick={(e) => popupHandler(e)} data-name={project.name} key={project.id}>
            <img src={project.banner_image.url} alt="img" />
        </li>
    ))

    /////////////////////////////////
    const popupHandler = (e) => {
        setShowPop("pop-show");
        // eslint-disable-next-line array-callback-return
        const projectData = projectsData.filter(ele => {
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
                        {allProject}
                        {/*                         
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
                        </li> */}
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