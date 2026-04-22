import { useNavigate } from "react-router-dom"
import { AppBackground, CustomButton } from "../../components"

function ProfileContent() {
    const navigate = useNavigate()

    const username = localStorage.getItem("username")
    const avatarLetter = username[0].toUpperCase()

    const handleLogout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("username")
        navigate("/login")
    }

    return (
        <div className="d-flex flex-column align-items-center w-100 px-4 px-md-5 pt-4 pb-5"
            style={{ gap: "1rem" }}>

            <div
                className="rounded-circle bg-green-solid d-flex align-items-center justify-content-center shadow"
                style={{
                    width: 72,
                    height: 72,
                    flexShrink: 0,
                    border: "3px solid #00362d",
                    marginTop: "-2.5rem"
                }}
            >
                <span style={{ fontSize: "1.8rem", fontWeight: 700, color: "#00362d" }}>
                    {avatarLetter}
                </span>
            </div>

            {/* Fields card */}
            <div className="bg-white rounded-4 shadow-sm p-4 w-100"
                style={{ maxWidth: 480, border: "1px solid #cee7e3" }}>

                <h6 className="text-green-dark fw-bold mb-3"
                    style={{ letterSpacing: "0.05em", fontSize: "0.8rem", textTransform: "uppercase" }}>
                    Account info
                </h6>

                <div>
                    <label className="form-label text-green-dark fw-semibold mb-1" style={{ fontSize: "0.85rem" }}>
                        Username
                    </label>
                    <p className="mb-0 text-green-dark" style={{ fontSize: "0.95rem" }}>@{username}</p>
                </div>
            </div>

            {/* Logout */}
            <div className="w-100 d-flex flex-column align-items-center">
                <CustomButton
                    onClick={handleLogout}
                    className="bg-white text-danger p-2 rounded border border-danger"
                    text="Log out"
                />
            </div>
        </div>
    )
}

function Profile() {
    return (
        <AppBackground title={"Profile"} whiteDivStyle="overflow-y-auto pt-5">
            <ProfileContent />
        </AppBackground>
    )
}

export default Profile