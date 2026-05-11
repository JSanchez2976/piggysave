import { useEffect, useState } from "react";
import { AppBackground } from "../../components"
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

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
            setRevenues(data);
        } catch (err) {
            console.error(err);
        }
    };

    const getTotalExpense = () => {
        return expenses.reduce((total, exp) => total + exp.importe, 0);
    }

    const getTotalRevenue = () => {
        return revenues.reduce((total, rev) => total + rev.importe, 0);
    }

    const getExpensesAndRevenuesDates = () => {
        return [
            ...expenses.map(exp => exp.fecha),
            ...revenues.map(rev => rev.fecha)
        ];
    }
    console.log(getExpensesAndRevenuesDates())
    console.log(revenues)
    const chartData = {
        labels: getExpensesAndRevenuesDates(),
        datasets: [
            {
                label: "Revenue",
                data: revenues.map(rev => rev.importe),
                borderColor: "rgb(75, 192, 192)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
            },
            {
                label: "Expenses",
                data: expenses.map(exp => exp.importe),
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "rgba(255, 99, 132, 0.2)",
            }
        ]
    };

    return (
        <AppBackground title={"Home"}
            whiteDivStyle="p-2">
            <div className="w-100 px-4 pt-4 pb-3">
                <div className="d-flex gap-3">
                    <div className="flex-fill bg-white rounded p-3 shadow-sm">
                        <h6 className="text-muted mb-1 small">Expenses</h6>
                        <h4 className="mb-0 fw-bold text-danger">${getTotalExpense()}</h4>
                    </div>
                    <div className="flex-fill bg-white rounded p-3 shadow-sm">
                        <h6 className="text-muted mb-1 small">Revenue</h6>
                        <h4 className="mb-0 fw-bold text-success">${getTotalRevenue()}</h4>
                    </div>
                </div>
            </div>

            <div className="row g-3 px-4 pb-4">
    <div className="col-12">
        <div 
            className="bg-white rounded p-3 shadow-sm" 
            style={{ height: window.innerWidth < 768 ? '250px' : '350px' }}
        >
            <Line 
                data={chartData} 
                options={{ 
                    responsive: true, 
                    maintainAspectRatio: false 
                }} 
            />
        </div>
    </div>
</div>
        </AppBackground>
    )
}

export default Home