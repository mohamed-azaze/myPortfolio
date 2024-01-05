import { Outlet } from "react-router-dom";



const AuthLayout = () => {
    return (
        <main id="guestLayout">
            <Outlet />
        </main>)
}
export default AuthLayout