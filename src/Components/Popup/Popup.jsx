import Style from "./Popup.module.css"

const Popup = ({ project, closePop }) => {
    return (
        <>
            <div className={Style["pup-container"]}>
                <div className={Style["pup-popup"]}>
                    <div className={Style["pup-close-button"]} onClick={closePop}>
                        <span>Close</span>
                    </div>
                    <div className={Style["pup-img"]}>
                        <img src={project.image} alt="img" />
                    </div>
                    <div className={Style["pup-info"]}>
                        <span className={Style["pup-name"]}><span>Project Name:</span> {project.name}</span>
                        <span className={Style["pup-lag"]}><span>Languages:</span> {project.lang}</span>
                    </div>
                    <div className={Style["pup-view-button"]}>
                        <a
                            href={project.link}
                            target="_blank"
                            rel="noreferrer">
                            LIVE
                        </a>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Popup