import { useState } from "react"
import { CustomButton, CustomClicableText, FormBackground } from "../../components"
import { useNavigate } from "react-router-dom"

function FillPwdRecover() {
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

        const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/profile`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            },
            body: JSON.stringify(user),
        })

        const result = await response.json();
        console.log('Respuesta del servidor:', result);

        if (response.status == "200") {
            navigate("/login")
            return alert("Password updated succesfully")
        }
        if (response.status == "401") {
            return alert("You must have previously logged in to change your password.")
        }
        if (response.status == "404") {
            return alert("User not found")
        }
        if (response.status == "422") {
            return alert("Validation error")
        }
    }

    return (
        <>
            User:
            <input type="text" className="cust-input rounded"
                onChange={(e) => setuserName(e.target.value)}
                placeholder="user1234" ></input>
            New password:
            <input type="password" className="cust-input rounded"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="******"></input>

            <CustomButton
                className="text-green-dark bg-green-solid p-2 form-element rounded"
                text="Change password"
                onClick={handleSubmit}
            />
            <CustomClicableText text="Go Back"
                onClick={() => navigate(-1)}
            />
        </>
    )
}

function PwdRecover() {
    return (
        <FormBackground body={<FillPwdRecover />} title="Password reset"></FormBackground>
    )
}

export default PwdRecover