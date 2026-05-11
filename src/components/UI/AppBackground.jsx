import NavBarBottom from "./NavBarBottom"
import NavBarTop from "./NavBarTop"

function AppBackground({ children, title, whiteDivStyle="" }) {
    return (
        <div className="d-flex flex-column" style={{minHeight: "100vh"}}>

            <NavBarTop></NavBarTop>
            <NavBarBottom></NavBarBottom>

            <div className="vw-100 bg-green-solid d-flex justify-content-center align-items-start position-relative px-5 pt-md-5 pb-5 pb-md-0"
                style={{ height: "35%", minHeight: "300px" }}>
                <h1 className="text-green-dark mt-5">{title}</h1>
            </div>

            <div className={`vw-100 bg-white-mint z-1 ${whiteDivStyle}`}
                style={{
                    flex: 1,
                    borderTopRightRadius: "7%",
                    borderTopLeftRadius: "7%",
                    overflowY: "auto",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    marginTop: "-3%",
                    paddingBottom: "78px"   // lo q mide la barra de abajo 
                }}>
                {children}
            </div>

        </div>
    )
}

export default AppBackground