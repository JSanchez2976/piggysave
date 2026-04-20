import { Routes, Route } from "react-router-dom"
import { Analysis, Auth, Categories, Expenses, Home, Login, Profile, PwdRecover, Register, Revenues, Splash } from "../pages"
import ProtectedRoute from "./ProtectedRoute"



export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Splash />}></Route>
            <Route path="/auth" element={<Auth />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/forgot-password" element={<PwdRecover />}></Route>
            <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>}></Route>
            <Route path="/analysis" element={<ProtectedRoute><Analysis /></ProtectedRoute>}></Route>
            <Route path="/analysis/revenues" element={<ProtectedRoute><Revenues /></ProtectedRoute>}></Route>
            <Route path="/analysis/expenses" element={<ProtectedRoute><Expenses /></ProtectedRoute>}></Route>
            <Route path="/categories" element={<ProtectedRoute><Categories /></ProtectedRoute>}></Route>
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>}></Route>

        </Routes>
    )
}