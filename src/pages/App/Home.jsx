import { useEffect, useState } from "react";
import { AppBackground } from "../../components"

function Home() {
    const [expenses, setExpenses] = useState([])
    const [revenues, setRevenues] = useState([])

    useEffect(() => {
        fetchExpenses();
        fetchRevenues();
    }, []);

    const fetchExpenses = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/expenses/`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            console.log("Respuesta del servidor ", data)

            setExpenses(data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchRevenues = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/revenue/`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            console.log("Respuesta del servidor ", data)

            setRevenues(data);
        } catch (err) {
            console.error(err);
        }
    };

    const getTotalExpense = () => {
        let total = 0
        expenses.forEach(exp => total += exp.importe)
        return total
    }

    const getTotalRevenue = () => {
        let total = 0
        revenues.forEach(rev => total += rev.importe)
        return total
    }

    return (
        <AppBackground title={"Home"}
            whiteDivStyle="p-2  ">
            {/* SECCIÓN DE EXPENSES Y REVENUES */}
            <div className="w-100 px-4 pt-4 pb-3">
                <div className="d-flex gap-3">
                    <div className="flex-fill bg-white rounded p-3 shadow-sm">
                        <h6 className="text-muted mb-1 small">Expenses</h6>
                        <h4 className="mb-0 fw-bold text-danger">${getTotalExpense()}</h4>
                    </div>
                    <div className="flex-fill bg-white rounded p-3 shadow-sm">
                        <h6 className="text-muted mb-1 small">Revenues</h6>
                        <h4 className="mb-0 fw-bold text-success">${ getTotalRevenue()}</h4>
                    </div>
                </div>
            </div>

            {/* DASHBOARDS */}
            <div className="row g-3 px-4 pb-4">
                <div className="col-12 col-md-6">
                    <div className="bg-white rounded p-4 shadow-sm h-100">
                        <h6 className="text-muted mb-3">Dashboard 1</h6>
                        <p className="mb-0">Contenido del dashboard 1</p>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="bg-white rounded p-4 shadow-sm h-100">
                        <h6 className="text-muted mb-3">Dashboard 2</h6>
                        <p className="mb-0">Contenido del dashboard 2</p>
                    </div>
                </div>
            </div>
        </AppBackground>
    )
}

export default Home