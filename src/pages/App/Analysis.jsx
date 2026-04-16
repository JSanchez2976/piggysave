import NavBarBottom from "../../components/UI/NavBarBottom"
import NavBarTop from "../../components/UI/NavBarTop"

function Analysis() {
    return (
        <>
            <div className="vh-100 d-flex flex-column">

                <NavBarTop></NavBarTop>
                <NavBarBottom></NavBarBottom>

                <div className="vw-100 bg-green-solid d-flex justify-content-center align-items-center position-relative px-5"
                    style={{ height: "35%" }}>
                    <h1 className="text-green-dark"></h1>
                </div>

                <div className="vw-100 bg-white-mint d-flex flex-column justify-content-around align-items-center z-1 position-absolute p-5 gap-3"
                    style={{
                        height: "75%",
                        bottom: 0,
                        borderTopRightRadius: "7%",
                        borderTopLeftRadius: "7%"
                    }}>

                </div>

            </div>
        </>
    )
}

export default Analysis