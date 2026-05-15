import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { AppBackground } from "../../../components"

const MAX_MONTHS_DISPLAY = 6

function toNumber(value) {
    const parsed = Number(value)
    return Number.isFinite(parsed) ? parsed : 0
}

function monthKey(dateValue) {
    const date = new Date(dateValue)
    if (Number.isNaN(date.getTime())) return ""
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`
}

function monthLabel(key) {
    const [year, month] = key.split("-").map(Number)
    if (!year || !month) return "N/A"
    const date = new Date(year, month - 1, 1)
    return date.toLocaleDateString("en-US", { month: "short" })
}

function formatCurrency(value) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 2,
    }).format(value)
}

function FillAnalysis() {
    const [revenues, setRevenues] = useState([])
    const [expenses, setExpenses] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            try {
                const headers = {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                }

                const [revResponse, expResponse] = await Promise.all([
                    fetch(`${import.meta.env.VITE_API_URL}/revenue/`, { method: "GET", headers }),
                    fetch(`${import.meta.env.VITE_API_URL}/expenses/`, { method: "GET", headers }),
                ])

                const revData = revResponse.ok ? await revResponse.json() : []
                const expData = expResponse.ok ? await expResponse.json() : []

                setRevenues(Array.isArray(revData) ? revData : [])
                setExpenses(Array.isArray(expData) ? expData : [])
            } catch (error) {
                console.error("Analysis data error:", error)
                setRevenues([])
                setExpenses([])
            } finally {
                setIsLoading(false)
            }
        }

        fetchData()
    }, [])

    const metrics = useMemo(() => {
        const totalRevenue = revenues.reduce((sum, item) => sum + toNumber(item.importe), 0)
        const totalExpense = expenses.reduce((sum, item) => sum + Math.abs(toNumber(item.importe)), 0)
        const netBalance = totalRevenue - totalExpense
        const expenseRatio = totalRevenue > 0 ? Math.min((totalExpense / totalRevenue) * 100, 100) : 0

        const monthBuckets = {}
        revenues.forEach((item) => {
            const key = monthKey(item.fecha)
            if (!key) return
            monthBuckets[key] = monthBuckets[key] || { revenue: 0, expense: 0 }
            monthBuckets[key].revenue += toNumber(item.importe)
        })
        expenses.forEach((item) => {
            const key = monthKey(item.fecha)
            if (!key) return
            monthBuckets[key] = monthBuckets[key] || { revenue: 0, expense: 0 }
            monthBuckets[key].expense += Math.abs(toNumber(item.importe))
        })

        const monthly = Object.keys(monthBuckets)
            .sort()
            .slice(-MAX_MONTHS_DISPLAY)
            .map((key) => ({ key, label: monthLabel(key), ...monthBuckets[key] }))

        const maxMonthly = Math.max(
            1,
            ...monthly.map((item) => Math.max(item.revenue, item.expense))
        )

        return {
            totalRevenue,
            totalExpense,
            netBalance,
            expenseRatio,
            monthly,
            maxMonthly,
        }
    }, [revenues, expenses])

    return (
        <div className="analysis-layout">
            <section className="analysis-kpis">
                <article className="app-card analysis-kpi">
                    <p className="analysis-kpi__label">Total revenues</p>
                    <p className="analysis-kpi__value text-success">{formatCurrency(metrics.totalRevenue)}</p>
                </article>
                <article className="app-card analysis-kpi">
                    <p className="analysis-kpi__label">Total expenses</p>
                    <p className="analysis-kpi__value text-danger">{formatCurrency(metrics.totalExpense)}</p>
                </article>
                <article className="app-card analysis-kpi">
                    <p className="analysis-kpi__label">Net balance</p>
                    <p className={`analysis-kpi__value ${metrics.netBalance >= 0 ? "text-success" : "text-danger"}`}>
                        {formatCurrency(metrics.netBalance)}
                    </p>
                </article>
            </section>

            <section className="row g-3 mx-0">
                <div className="col-12 col-xl-8 px-0">
                    <article className="app-card analysis-card">
                        <div className="analysis-card__head">
                            <h3 className="mb-1">Monthly movement</h3>
                            <p className="mb-0 text-secondary">Last 6 months of revenues vs expenses.</p>
                        </div>

                        {isLoading ? (
                            <p className="text-secondary mb-0">Loading chart data...</p>
                        ) : metrics.monthly.length === 0 ? (
                            <p className="text-secondary mb-0">No monthly data yet.</p>
                        ) : (
                            <div className="analysis-bars">
                                {metrics.monthly.map((item) => (
                                    <div className="analysis-bars__group" key={item.key}>
                                        <div className="analysis-bars__stack">
                                            <div
                                                className="analysis-bars__bar analysis-bars__bar--revenue"
                                                style={{ height: `${(item.revenue / metrics.maxMonthly) * 100}%` }}
                                                title={`Revenue: ${formatCurrency(item.revenue)}`}
                                            ></div>
                                            <div
                                                className="analysis-bars__bar analysis-bars__bar--expense"
                                                style={{ height: `${(item.expense / metrics.maxMonthly) * 100}%` }}
                                                title={`Expense: ${formatCurrency(item.expense)}`}
                                            ></div>
                                        </div>
                                        <span className="analysis-bars__label">{item.label}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </article>
                </div>

                <div className="col-12 col-xl-4 px-0">
                    <article className="app-card analysis-card analysis-card--centered">
                        <div className="analysis-card__head text-center">
                            <h3 className="mb-1">Expense ratio</h3>
                            <p className="mb-0 text-secondary">How much of revenue is consumed by expenses.</p>
                        </div>

                        <div
                            className="analysis-donut"
                            style={{
                                background: `conic-gradient(#ef6f6c ${metrics.expenseRatio}%, rgba(13, 187, 149, 0.16) 0)`,
                            }}
                        >
                            <div className="analysis-donut__inner">
                                <strong>{metrics.expenseRatio.toFixed(1)}%</strong>
                                <span>Expense ratio</span>
                            </div>
                        </div>

                        <div className="analysis-legend">
                            <span><i className="analysis-legend__dot analysis-legend__dot--expense"></i>Expenses</span>
                            <span><i className="analysis-legend__dot analysis-legend__dot--revenue"></i>Remaining</span>
                        </div>
                    </article>
                </div>
            </section>

            <section className="container text-center px-0 mt-2">
                <div className="row g-4 justify-content-center">
                    <div className="col-12 col-md-6">
                        <Link
                            to="/analysis/revenues"
                            className="text-decoration-none d-block rounded-pill border border-3 border-success-subtle p-4 bg-light shadow-sm w-100 text-center"
                        >
                            <h2 className="fs-4 fw-bold text-success m-0">
                                REVENUES
                            </h2>
                        </Link>
                    </div>

                    <div className="col-12 col-md-6">
                        <Link
                            to="/analysis/expenses"
                            className="text-decoration-none d-block rounded-pill border border-3 border-danger p-4 bg-light shadow-sm w-100 text-center"
                        >
                            <h2 className="fs-4 fw-bold text-danger m-0">
                                EXPENSES
                            </h2>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

function Analysis() {
    return (
        <AppBackground title={"Analysis"}><FillAnalysis /></AppBackground>
    )
}

export default Analysis