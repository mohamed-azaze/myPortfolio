import Heading from '../../Heading/Heading'
import Style from './Login.module.css'
// import axiosClient from '../../../axios_client'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStateContext } from '../../../context/ContextProvider'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../Firebase/index"

const Login = () => {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const { setUser, setToken, token } = useStateContext()
    const [errors, setErrors] = useState([])


    const navigate = useNavigate()



    if (token) {
        navigate('/myportfolio/dashboard')
    }
    const onsubmit = (e) => {
        e.preventDefault();
        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }
        signInWithEmailAndPassword(auth, payload.email, payload.password)
            .then((userCredential) => {
                const user = userCredential.user;
                setToken(user.accessToken)
                setUser({ name: "Azaze" })
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                if (errorCode === "auth/invalid-credential") {
                    setErrors("invalid email or Password ")
                } else {
                    setErrors(errorMessage)
                }
            });


        // axiosClient.post("/login", payload).then((data) => {
        //     setToken(data.token);
        //     setUser(data.user);
        // }).catch(error => {
        //     const response = error.response;

        //     if (response && response.status === 422) {
        //         if (response.data.errors) {

        //             setErrors(response.data.errors)
        //         } else {
        //             setErrors({
        //                 email: [response.data.message]
        //             })

        //         }
        //     }
        // })
    }

    return (
        <>
            <div className={`${Style['login_container']} container`}>
                <div className={`${Style['heading_form_container']}`}>
                    <div style={{ paddingTop: "100px", paddingBottom: "50px", }}>
                        <Heading
                            // heading={"MY"}
                            headingSpan={"Login"}
                            backSpan={"Login"}
                        />
                    </div>

                    <div className={`${Style['login_form']}`}>
                        <form onSubmit={(e) => onsubmit(e)} >
                            <label htmlFor="email">Email</label>
                            <input ref={emailRef} type="email" name="email" id="email" />
                            <label htmlFor="password">Password</label>
                            <input ref={passwordRef} type="password" />
                            {errors &&
                                <>
                                    <div className='error-message'>
                                        {errors}
                                    </div>
                                </>
                            }
                            <button>Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login