import { useNavigate } from "react-router-dom"

function SignUpButton() {
    const navigate = useNavigate()
    
    return (
        <button
            className="bg-white-mint w-100 text-green-solid rounded p-2"
            onClick={() => navigate("/register")}
        >
            Sign Up
        </button>
    )
}

export default SignUpButton