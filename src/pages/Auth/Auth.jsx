import piggyLogo from "../../assets/piggyLogo.png"
import { LoginButton, RecoveryText, SignUpButton } from "../../components"

function Auth() {
    return (
        <>
            <div className="vw-100 vh-100 bg-white-mint d-flex justify-content-center align-items-center">
                <div className="container w-75 d-flex flex-column align-items-center text-center gap-2">
                    <img src={piggyLogo} className="img-splash "></img>
                    <h1 className="text-green-solid">PiggySave</h1>
                    <p className="text-justify">Manage your finances intelligently</p>
                    <LoginButton />
                    <SignUpButton />
                    <RecoveryText />
                </div>
            </div>
        </>
    )
}

export default Auth
