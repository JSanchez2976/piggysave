function FormBackground({body,title=""}) {
    return (
        <div className="vh-100 d-flex flex-column">
            <div className="vw-100 bg-green-solid d-flex justify-content-center align-items-center position-relative"
                style={{ height: "35%" }}>
                <h1 className="text-green-dark">{title}</h1>
            </div>

            <form className="vw-100 bg-white-mint d-flex flex-column justify-content-around align-items-center z-1 position-absolute p-5 gap-3"
                style={{
                    height: "75%",
                    bottom: 0,
                    borderTopRightRadius: "7%",
                    borderTopLeftRadius: "7%"
                }}>
                {body}
            </form>
            
        </div>
    )
}

export default FormBackground