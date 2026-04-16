import piggyIcon from "../../assets/piggyIcon.png"
import { NavLink } from "react-router-dom"


function NavBarTop() {
    return (
        <>
            <nav className="navbar navbar-expand-md navbar-dark bg-white-mint fixed-top justify-content-around d-none d-md-flex">
                <a className="navbar-brand text-black align-items-center d-flex" >
                    <img src={piggyIcon} alt="Logo" width="30" className="d-inline-block align-text-center mx-2" />
                    PiggySave
                </a>
                <div className="container-fluid ">
                    <div className="navbar-nav gap-3">
                        <NavLink
                            to="/home"
                            className={({ isActive }) =>
                                `nav-link ${isActive ? "active" : ""}`
                            }
                        >
                            Home
                        </NavLink>

                        <NavLink
                            to="/analysis"
                            className={({ isActive }) =>
                                `nav-link ${isActive ? "active" : ""}`
                            }
                        >
                            Analysis
                        </NavLink>

                        <NavLink
                            to="/categories"
                            className={({ isActive }) =>
                                `nav-link ${isActive ? "active" : ""}`
                            }
                        >
                            Categories
                        </NavLink>

                        <NavLink
                            to="/profile"
                            className={({ isActive }) =>
                                `nav-link ${isActive ? "active" : ""}`
                            }
                        >
                            Profile
                        </NavLink>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default NavBarTop