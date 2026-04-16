import { Routes, Route } from "react-router-dom"
import { Analysis, Auth, Categories, Home, Login, Profile, PwdRecover, Register, Splash } from "../pages"



export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Splash />}></Route>
            <Route path="/auth" element={<Auth />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/forgot-password" element={<PwdRecover />}></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/analysis" element={<Analysis />}></Route>
            <Route path="/categories" element={<Categories />}></Route>
            <Route path="/profile" element={<Profile />}></Route>

        </Routes>
    )
}