import { useNavigate } from "react-router-dom"
import piggyIcon from "../assets/piggyIcon.png"
import { useEffect, useState } from "react"
import OnBoard from "./OnBoarding/OnBoard"

function Splash() {
    const navigate = useNavigate()
    const [showOnBoard, setShowOnBoard] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            if (localStorage.getItem('token') == null) {
                setShowOnBoard(true)
            } else {
                navigate("/auth")
            }
        }, 3000)
        return () => clearTimeout(timer)
    }, [navigate])

    if(showOnBoard) return <OnBoard/>
    return (
        <>
            <div className="vw-100 vh-100 bg-green-solid d-flex justify-content-center align-items-center">
                <div className="container w-75 d-flex flex-column align-items-center text-center fade-in gap-2">
                    <img src={piggyIcon} className="img-splash"></img>
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