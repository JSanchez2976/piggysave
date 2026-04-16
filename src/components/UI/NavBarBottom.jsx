import { NavLink } from "react-router-dom"
import homeUrl from "../../assets/home.png"
import analyticsUrl from "../../assets/bar-chart.png"
import categoriesUrl from "../../assets/categories.png"
import userUrl from "../../assets/user.png"

function NavBarBottom() {
    return (
        <nav className="navbar navbar-dark bg-green-solid fixed-bottom d-md-none">
            <div className="container-fluid px-0">
                <div className="d-flex w-100 px-3">
                    <NavLink
                        to="/home"
                        className={({ isActive }) =>
                            `nav-img flex-fill rounded d-flex align-items-center justify-content-center py-3  ${isActive ? "bg-yellow-soft" : ""}`
                        }
                    >
                        <img src={homeUrl} alt="Logo" style={{ width: 30 }} />

                    </NavLink>

                    <NavLink
                        id="analysis"
                        to="/analysis"
                        className={({ isActive }) =>
                            `nav-img flex-fill rounded d-flex align-items-center justify-content-center py-3 ${isActive ? "bg-yellow-soft" : ""}`
                        }
                    >
                        <img src={analyticsUrl} alt="Logo" width="30" />


                    </NavLink>

                    <NavLink
                        to="/categories"
                        className={({ isActive }) =>
                            `nav-img flex-fill rounded d-flex align-items-center justify-content-center py-3  ${isActive ? "bg-yellow-soft" : ""}`
                        }
                    >
                        <img src={categoriesUrl} alt="Logo" width="30" />

                    </NavLink>

                    <NavLink
                        to="/profile"
                        className={({ isActive }) =>
                            `nav-img flex-fill rounded d-flex align-items-center justify-content-center py-3  ${isActive ? "bg-yellow-soft" : ""}`
                        }
                    >
                        <img src={userUrl} alt="Logo" width="30" />
                    </NavLink>
                </div>
            </div>
        </nav >
    )
}

export default NavBarBottom