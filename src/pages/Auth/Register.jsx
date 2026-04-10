import { useNavigate } from "react-router-dom"
import { FormBackground, CustomButton, CustomClicableText, } from "../../components"

function FillRegister() {
    const navigate = useNavigate()

    return (
        <>
            <p>User: </p>
            <input type="text" className="cust-input" placeholder="user1234"></input>
            <p>Password: </p>
            <input type="password" className="cust-input" placeholder="******"></input>

            <CustomButton
                onClick={() => navigate(null)}   // cambiar luego
                className="bg-white-mint text-green-solid form-element rounded p-2"
                text="Sign up"
                type="submit"
            />

            <CustomClicableText
                text={
                    <span>
                        Already have an account? <span className="text-primary text-decoration-underline">Log in</span>
                    </span>
                }
                onClick={() => navigate("/login")}
            />
        </>
    )
}

function Register() {
    return (
        <FormBackground body={<FillRegister />} title="Create Account"></FormBackground>
    )
}

export default Register
