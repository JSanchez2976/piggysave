import { useNavigate } from "react-router-dom"
import { FormBackground, CustomButton, CustomClicableText } from "../../components"
import { useState } from "react"


function FillLogin() {
    const navigate = useNavigate()

    const [userName, setuserName] = useState("")
    const [password, setPassword] = useState("")


    const handleSubmit = async () => {
        if (!userName) return alert("Fill in the user field")
        if (!password) return alert("Fill in the password field")

        const user = {
            username: userName,
            password: password
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user),
            });

            const result = await response.json();
            console.log('Respuesta del servidor:', result);
            localStorage.setItem("token",result.access_token)
            
            if(response.status == 200){
                navigate("/home")
            }
            if(response.status == 401){
                return alert("Invalid credentials")
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
                onClick={handleSubmit}   // cambiar luego
                className="text-green-dark bg-green-solid p-2 form-element rounded"
                text="Log In"
            />
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
        <FormBackground body={<FillLogin />} title="Welcome"></FormBackground>
    )
}

export default Login
