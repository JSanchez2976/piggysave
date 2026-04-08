import piggyLogo from "../assets/piggyLogo.png"

function Splash() {
    return (
        <>
            <div className="vw-100 vh-100 bg-green-solid d-flex justify-content-center align-items-center">
                    <div className="container w-75 d-flex flex-column align-items-center text-center fade-in">
                        <img src={piggyLogo} className="w-50 mb-4"></img>
                        <h1 className="splash text-white">PiggySave</h1>
                    </div>
            </div>
        </>
    )
}

export default Splash