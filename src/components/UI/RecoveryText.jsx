import { useNavigate } from "react-router-dom"

function RecoveryText(){
    const navigate = useNavigate()
    return(
        <p className="text-justify"
        style={{ cursor: 'pointer' }}
        onClick={()=> navigate("/forgot-password")}
        >
            Forgot Password?
        </p>
    )
}

export default RecoveryText