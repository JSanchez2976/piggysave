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
            <div className="vw-100 vh-100 d-flex justify-content-center align-items-center"
                style={{
                    background: "radial-gradient(circle at top left, rgba(255,255,255,0.14), transparent 32%), linear-gradient(145deg, #11bf99 0%, #0f4d43 100%)"
                }}>
                <div className="container w-75 d-flex flex-column align-items-center text-center fade-in gap-3">
                    <span className="app-badge bg-white border-0 text-green-dark">Personal finance</span>
                    <img src={piggyIcon} className="img-splash"></img>
                    <h1 className="text-white-mint brand-font mb-0">PiggySave</h1>
                    <p className="text-white-mint mb-0" style={{ maxWidth: "420px", opacity: 0.82 }}>
                        Un inicio mas limpio y con mejor presencia para dar continuidad al rediseno del producto.
                    </p>
                    <div className="spinner-border text-white-mint" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Splash