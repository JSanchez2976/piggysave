import { useNavigate } from "react-router-dom"
import { FormBackground, CustomButton, CustomClicableText } from "../../components"

function FillLogin() {
    const navigate = useNavigate()
    return (
        <>
            <p>User: </p>
            <input type="text" className="cust-input" placeholder="user1234"></input>
            <p>Password: </p>
            <input type="password" className="cust-input" placeholder="******"></input>
            <CustomButton
                onClick={null}   // cambiar luego
                className="text-green-dark bg-green-solid p-2 form-element rounded"
                text="Log In"
                type="submit" />
            <CustomClicableText text="Forgot Password?"
                onClick={() => navigate("/forgot-password")}
            />
            <CustomButton
                onClick={() => navigate("/register")}   // cambiar luego
                className="bg-white-mint text-green-solid form-element rounded p-2"
                text="Sign up"
            />
        </>
    )

}

function Login() {
    return (
        <FormBackground body={<FillLogin/>} title="Welcome"></FormBackground>
    )
}

export default Login
