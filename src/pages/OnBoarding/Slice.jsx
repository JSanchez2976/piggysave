

function SliceA({ text }) {
    return (
        <>
            <div className="vh-100 d-flex flex-column">
                <div className="vw-100 bg-green-solid d-flex justify-content-center align-items-center position-relative"
                    style={{ height: "35%" }}>
                    <h1 className="text-green-dark">{text}</h1>
                </div>

                <div className="vw-100 bg-white-mint d-flex justify-content-center align-items-center  z-1 position-absolute"
                    style={{
                        height: "75%",
                        bottom: 0,
                        borderTopRightRadius: "7%",
                        borderTopLeftRadius: "7%"
                    }}>
                    <div className="slice-circle"></div>
                </div>
            </div>
        </>
    )
}

export default SliceA