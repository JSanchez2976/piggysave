import piggyLogo from "../../assets/piggyLogo.png"
import Splash from "../Splash"

function Auth() {
    return (
        <>
            <div className="vw-100 vh-100 bg-white-mint d-flex justify-content-center align-items-center">
                <div className="container w-75 d-flex flex-column align-items-center text-center gap-2">
                    <img src={piggyLogo} className="img-splash "></img>
                    <h1 className="text-green-solid">PiggySave</h1>
                    <p className="text-justify">Gestiona tus finanzas de manera inteligente</p>
                    <button className="bg-green-solid w-100 rounded p-2">Log in</button>
                    <button className="bg-white-mint w-100 text-green-solid rounded p-2">Sign up</button>
                    <a href="" ><p className="fw-bold text-justify">Forgot Password?</p></a>
                </div>
            </div>
        </>
    )
}

export default Auth
