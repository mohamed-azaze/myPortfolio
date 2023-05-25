// import { useRef } from "react"
import Style from "./Contact.module.css"
import Heading from "../Heading/Heading"
import MainMap from "./MainMap/MainMap"
import Title from "../Title/Title"
// EmailJS
// import emailjs from "@emailjs/browser"

const Contact = () => {
    Title("Contact-Azaze")
    // // Start Form Function
    // const form = useRef();

    // const sendEmail = (e) => {
    //     e.preventDefault();

    //     emailjs.sendForm("service_abgx3jh", "template_h30e8ca", form.current, "8u5D18XOw-sV192mw")
    //         .then((result) => {
    //             alert("Message successfully sent!")
    //             console.log(result.text);
    //         }, (error) => {
    //             alert("Failed to send the message, please try again")
    //             console.log(error.text);
    //         });
    //     e.target.reset()
    // };
    // End Form Function

    return (
        <>
            <div style={{ paddingTop: "100px", paddingBottom: "50px", overflow: "hidden" }}>
                <Heading
                    heading={"Contact"}
                    headingSpan={"ME"}
                    backSpan={"CONTACT"}
                />
            </div>
            <div className={`${Style["c-me-container"]} container`}>
                <div className={Style["c-me-form"]}>
                    <form
                    // ref={form} onSubmit={sendEmail}
                    >
                        <div className={Style["c-input-group"]}>
                            <input
                                type="text"
                                placeholder="Name"
                                required
                                name="name"
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                required
                                name="email"
                            />
                        </div>
                        <div className={Style["c-input-group"]}>
                            <input
                                type="text"
                                placeholder="Subject"
                                required
                                name="subject"
                            />
                        </div>
                        <div className={Style["c-input-group"]}>
                            <textarea
                                placeholder="Message"
                                required
                                name="message"
                            />
                        </div>
                        <div className={Style["c-input-group"]}>
                            <input
                                type="submit"
                                value="SEND"
                            />
                        </div>

                    </form>
                </div>
                <div className={Style["c-me-map"]}
                    style={{ maxWidth: "100%" }}
                >
                    <MainMap />
                </div>
            </div>

        </>
    )
}

export default Contact