import { useNavigate } from "react-router-dom"
import piggyLogo from "../assets/piggyLogo.png"
import { useEffect } from "react"

function Splash() {
    const navigate = useNavigate()
    
      useEffect(() => {
        const timer = setTimeout(() => {
          navigate("/auth")
        }, 3000)
        return () => clearTimeout(timer)
      }, [navigate])

    return (
        <>
            <div className="vw-100 vh-100 bg-green-solid d-flex justify-content-center align-items-center">
                <div className="container w-75 d-flex flex-column align-items-center text-center fade-in gap-2">
                    <img src={piggyLogo} className="img-splash"></img>
                    <h1 className="text-white-mint">PiggySave</h1>
                    <div className="spinner-border text-white-mint" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Splash