import Style from "./Heading.module.css"

const Heading = ({ heading, headingSpan, backSpan }) => {
    return (
        <>
            <header className={Style.header}>
                <div className={Style["a-text"]}>
                    <h2
                        className="animate__animated animate__heartBeat animate__delay-1s">
                        {heading}
                        <span> {headingSpan}</span>
                    </h2>
                    <span >{backSpan}</span>
                </div>
            </header>
        </>
    )
}

export default Heading