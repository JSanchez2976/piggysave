import { useNavigate } from "react-router-dom"

function LoginButton() {
    const navigate = useNavigate()

    return (
        <button
            className="bg-green-solid w-100 rounded p-2"
            onClick={() => navigate("/login")}>
            Log In
        </button>
    )

}

export default LoginButton