import { Outlet } from "react-router-dom";
import NavBar from "../NavBar/NavBar";

const GuestLayout = () => {


    return (
        <>
            <aside>
                <NavBar />

            </aside>
            <main id="guestLayout">

                <Outlet />
            </main>
        </>
    )
}
export default GuestLayout