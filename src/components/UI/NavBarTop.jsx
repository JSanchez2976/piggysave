import piggyIcon from "../../assets/piggyIcon.png"
import { NavLink } from "react-router-dom"


function NavBarTop() {
    return (
        <>
            <nav className="navbar navbar-expand-md fixed-top justify-content-between d-none d-md-flex app-nav-top">
                <a className="navbar-brand align-items-center d-flex app-nav-brand" >
                    <img src={piggyIcon} alt="Logo" width="32" className="d-inline-block align-text-center me-2" />
                    PiggySave
                </a>
                <div className="app-nav-links">
                        <NavLink
                            to="/home"
                            className={({ isActive }) =>
                                `nav-link app-nav-link ${isActive ? "active" : ""}`
                            }
                        >
                            Home
                        </NavLink>

                        <NavLink
                            to="/analysis"
                            className={({ isActive }) =>
                                `nav-link app-nav-link ${isActive ? "active" : ""}`
                            }
                        >
                            Analysis
                        </NavLink>

                        <NavLink
                            to="/categories"
                            className={({ isActive }) =>
                                `nav-link app-nav-link ${isActive ? "active" : ""}`
                            }
                        >
                            Categories
                        </NavLink>

                        <NavLink
                            to="/profile"
                            className={({ isActive }) =>
                                `nav-link app-nav-link ${isActive ? "active" : ""}`
                            }
                        >
                            Profile
                        </NavLink>
                </div>
            </nav>
        </>
    )
}

export default NavBarTop