import Heading from '../../Heading/Heading'
import Style from './Login.module.css'
import axiosClient from '../../../axios_client'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStateContext } from '../../../context/ContextProvider'

const Login = () => {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const { setUser, setToken, token } = useStateContext()
    const [errors, setErrors] = useState([])


    const navigate = useNavigate()

    if (token) {
        navigate('/dashboard')
    }
    const onsubmit = (e) => {
        e.preventDefault();
        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }
        axiosClient.post("/login", payload).then((data) => {
            setToken(data.token);
            setUser(data.user);
        }).catch(error => {
            const response = error.response;

            if (response && response.status === 422) {
                if (response.data.errors) {

                    setErrors(response.data.errors)
                } else {
                    setErrors({
                        email: [response.data.message]
                    })

                }
            }

        })

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
                            {errors['email'] &&
                                errors['email'].map(error => (
                                    <>
                                        <div className='error-message'>
                                            {error}
                                        </div>
                                    </>
                                ))
                            }
                            <label htmlFor="password">Password</label>
                            <input ref={passwordRef} type="password" />
                            <button>Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login