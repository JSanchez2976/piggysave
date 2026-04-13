import { Routes, Route } from "react-router-dom"
import { Auth, Home, Login, PwdRecover, Register, Splash } from "../pages"



export const AppRouter = () => {
    return(
        <Routes>
            <Route path="/" element ={<Splash/>}></Route>
            <Route path="/auth" element ={<Auth/>}></Route>
            <Route path="/login" element ={<Login/>}></Route>
            <Route path="/register" element ={<Register/>}></Route>
            <Route path="/forgot-password" element ={<PwdRecover/>}></Route>
            <Route path="/home" element ={<Home/>}></Route>
        </Routes>
    )
}