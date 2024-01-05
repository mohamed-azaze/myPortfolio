import Style from "./Card.module.css"

const Card = ({ heading, one, two, three, four, className, showCard }) => {
    return (
        <div className={`${Style["c-container"]} ${Style[className]} ${Style[showCard]}  card-animtaion`}>
            <header className={Style["c-header"]}>
                <h2 className="ele-haver">{heading}</h2>
            </header>
            <div className={Style["c-line"]}></div>
            <main className={`${Style["c-main"]} `}>
                <span>{one}</span>
                <span>{two ? two : null}</span>
                <span>{three ? three : null}</span>
                <span>{four ? four : null}</span>
            </main>
        </div>
    )
}

export default Card


