import { useNavigate } from "react-router-dom"
import { FormBackground, CustomButton, CustomClicableText, } from "../../components"
import { useState } from "react"

function FillRegister() {
    const navigate = useNavigate()

    const [userName, setuserName] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async () => {
        if (!userName) return alert("Fill in the user field")
        if (!password) return alert("Fill in the password field")

        const newUser = {
            username: userName,
            password: password
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newUser),
            });

            const result = await response.json();
            console.log('Respuesta del servidor:', result);
            if (result.detail == 'User already exists') {
                return alert("User already exists")
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <>
            <p>User: </p>
            <input type="text" className="cust-input"
                onChange={(e) => setuserName(e.target.value)}
                placeholder="user1234" ></input>
            <p>Password: </p>
            <input type="password" className="cust-input"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="******"></input>

            <CustomButton
                onClick={handleSubmit}
                className="bg-white-mint text-green-solid form-element rounded p-2"
                text="Sign up"
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
