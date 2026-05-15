import { useEffect, useMemo, useState } from "react"
import { AnalysisOptions, AppBackground } from "../../../../components"
import { useNavigate } from "react-router-dom"

const routes = {
    createRoute: "/analysis/expenses/create",
    updateRoute: "/analysis/expenses/update",
    deleteRoute: "/analysis/expenses/delete"
}

function formatCurrency(value) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 2,
    }).format(value)
}

function Expenses() {
    const navigate = useNavigate()
    const [expenses, setExpenses] = useState([])

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/expenses/`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "application/json",
                    },
                })

                const data = response.ok ? await response.json() : []
                setExpenses(Array.isArray(data) ? data : [])
            } catch (error) {
                console.error("Error loading expenses:", error)
                setExpenses([])
            }
        }

        fetchExpenses()
    }, [])

    const stats = useMemo(() => {
        const now = new Date()
        const currentMonth = now.getMonth()
        const currentYear = now.getFullYear()

        const total = expenses.reduce((sum, item) => sum + Math.abs(Number(item.importe) || 0), 0)
        const monthly = expenses.reduce((sum, item) => {
            const date = new Date(item.fecha)
            if (date.getMonth() === currentMonth && date.getFullYear() === currentYear) {
                return sum + Math.abs(Number(item.importe) || 0)
            }
            return sum
        }, 0)

        const recent = [...expenses]
            .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
            .slice(0, 4)

        return {
            count: expenses.length,
            total,
            monthly,
            recent,
        }
    }, [expenses])

    return (
        <AppBackground
            title={"Expenses"}
            whiteDivStyle={"d-flex flex-column align-items-stretch"}>
            <div className="analysis-subpage">
                <section className="app-card analysis-subheader">
                    <span className="app-badge">Expenses hub</span>
                    <h2 className="mb-2">Track and operate your expense flow</h2>
                    <p className="mb-0 text-secondary">Quick metrics plus direct actions to create, update and delete data.</p>
                </section>

                <section className="analysis-sub-kpis">
                    <article className="app-card analysis-sub-kpi">
                        <p className="analysis-sub-kpi__label">Records</p>
                        <h3 className="analysis-sub-kpi__value">{stats.count}</h3>
                    </article>
                    <article className="app-card analysis-sub-kpi">
                        <p className="analysis-sub-kpi__label">Total expense</p>
                        <h3 className="analysis-sub-kpi__value text-danger">{formatCurrency(stats.total)}</h3>
                    </article>
                    <article className="app-card analysis-sub-kpi">
                        <p className="analysis-sub-kpi__label">This month</p>
                        <h3 className="analysis-sub-kpi__value">{formatCurrency(stats.monthly)}</h3>
                    </article>
                </section>

                <AnalysisOptions
                    routes={routes}
                    sectionName="expenses"
                />

                <section className="app-card analysis-sub-list p-3 p-md-4">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h3 className="mb-0">Recent expenses</h3>
                        <span className="app-badge">Last 4</span>
                    </div>

                    {stats.recent.length === 0 ? (
                        <p className="text-secondary mb-0">No expenses yet. Create your first one from the action cards above.</p>
                    ) : (
                        <div className="analysis-sub-list__items">
                            {stats.recent.map((item) => (
                                <article className="analysis-sub-list__item" key={item.id}>
                                    <div>
                                        <strong>{item.concepto}</strong>
                                        <p className="analysis-sub-list__meta mb-0">
                                            {new Date(item.fecha).toLocaleDateString("en-US")}
                                        </p>
                                    </div>
                                    <span className="analysis-sub-list__amount text-danger">
                                        {formatCurrency(Math.abs(Number(item.importe) || 0))}
                                    </span>
                                </article>
                            ))}
                        </div>
                    )}
                </section>
                <button
                    type="button"
                    className="btn btn-danger rounded-pill w-50 px-5 mt-3 fw-bold"
                    onClick={() => navigate(-1)}
                >
                    BACK
                </button>
            </div>

        </AppBackground>
    )
}
export default Expenses