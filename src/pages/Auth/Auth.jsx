import { useNavigate } from "react-router-dom"
import piggyLogo from "../../assets/piggyLogo.png"
import {CustomClicableText, CustomButton } from "../../components"

function Auth() {
    const navigate = useNavigate()

    return (
        <>
            <div className="vw-100 vh-100 bg-white-mint d-flex justify-content-center align-items-center">
                <div className="container w-75 d-flex flex-column align-items-center text-center gap-2">
                    <img src={piggyLogo} className="img-splash "></img>
                    <h1 className="text-green-solid">PiggySave</h1>
                    <p className="text-justify">Manage your finances intelligently</p>
                    <CustomButton
                        onClick={() => navigate("/login")}
                        className="text-green-dark bg-green-solid p-2 form-element rounded"
                        text="Log In" />
                    <CustomButton
                        onClick={() => navigate("/register")}
                        className="bg-white-mint text-green-solid form-element rounded p-2"
                        text="Sign up" />
                    <CustomClicableText text="Forgot Password?"
                    onClick={() => navigate("/forgot-password")}
                    />
                </div>
            </div>
        </>
    )
}

export default Auth
