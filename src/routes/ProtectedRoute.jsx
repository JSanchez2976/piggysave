import { Navigate } from "react-router-dom"

function ProtectedRoute({children}){
    const token = localStorage.getItem("token")

    // replace es para que no vuelva a la ruta de la q procedia originalmente, haciendo un bucle infinito
    if(!token){
        return <Navigate to="/auth" replace/>
    }

    return children
}

export default ProtectedRoute