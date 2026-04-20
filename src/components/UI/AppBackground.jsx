import NavBarBottom from "./NavBarBottom"
import NavBarTop from "./NavBarTop"

function AppBackground({ children, title, greenDivStyle="" }) {
    return (
        <div className="vh-100 d-flex flex-column">

            <NavBarTop></NavBarTop>
            <NavBarBottom></NavBarBottom>

            <div className="vw-100 bg-green-solid d-flex justify-content-center align-items-start position-relative px-5 pt-md-5 pb-5 pb-md-0"
                style={{ height: "35%" }}>
                <h1 className="text-green-dark mt-5">{title}</h1>
            </div>

            <div className={`vw-100 bg-white-mint z-1 position-absolute ${greenDivStyle}`}
                style={{
                    height: "75%",
                    bottom: 0,
                    borderTopRightRadius: "7%",
                    borderTopLeftRadius: "7%"
                }}>
                {children}
            </div>

        </div>
    )
}

export default AppBackground