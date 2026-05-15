import { useNavigate } from "react-router-dom"
import { AppBackground } from "../../components"
import { useEffect, useState } from "react"



function Home() {
    const navigate = useNavigate()
    const userName = localStorage.getItem("username") || "PiggySaver"
    const [balance, setBalance] = useState(0)
    const [loading, setLoading] = useState(true)

    async function getBalance() {
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
        
        const totalRevenue = revData.reduce((acc, item) => acc + item.importe, 0)
        const totalExpense = expData.reduce((acc, item) => acc + item.importe, 0)

        setBalance(totalRevenue + totalExpense)
        setLoading(false)
    }

    useEffect(() => {
        getBalance()
    }, [])

    const quickStats = [
        {
            label: "Balance estimado",
            value: loading ? "Cargando..." : `${balance.toFixed(2)} €`,
            caption: "Lectura visual rapida del estado general"
        },
        {
            label: "Categorias activas",
            value: "8",
            caption: "Organiza mejor gastos e ingresos"
        },
        {
            label: "Ritmo mensual",
            value: "+18%",
            caption: "Tendencia frente al periodo anterior"
        }
    ]

    const highlights = [
        {
            icon: "01",
            title: "Analysis mas visible",
            text: "La navegacion y la jerarquia visual ahora separan mejor resumen, acciones y contenido operativo."
        },
        {
            icon: "02",
            title: "Acciones rapidas",
            text: "Desde Home puedes saltar a analysis, categories o profile sin depender de una pantalla vacia."
        },
        {
            icon: "03",
            title: "Sistema visual consistente",
            text: "Fondos, paneles, bordes y tipografia siguen un mismo criterio en toda la aplicacion."
        }
    ]

    return (
        <AppBackground title={"Home"}>
            <div className="container-fluid px-0 d-flex flex-column home-sections">
                <section className="app-card p-4 p-lg-5 home-section home-section--hero">
                    <div className="row g-4 align-items-center">
                        <div className="col-12 col-lg-7">
                            <span className="app-badge mb-3">Overview</span>
                            <h2 className="mb-3">Hola, {userName}. Tu panel ahora prioriza lectura, foco y velocidad.</h2>
                            <p className="mb-4 text-secondary">
                                Reorganice la experiencia para que la app se sienta menos prototipo y mas producto: mejor contraste, navegacion clara y tarjetas con jerarquia visual real.
                            </p>
                            <div className="app-hero-actions">
                                <button className="app-action-chip" onClick={() => navigate("/analysis")}>Ir a Analysis</button>
                                <button className="app-action-chip" onClick={() => navigate("/categories")}>Ver Categories</button>
                                <button className="app-action-chip" onClick={() => navigate("/profile")}>Abrir Profile</button>
                            </div>
                        </div>

                        <div className="col-12 col-lg-5">
                            <div className="row g-3">
                                {quickStats.map((stat) => (
                                    <div className="col-12" key={stat.label}>
                                        <article className="app-card app-kpi">
                                            <p className="app-kpi__label">{stat.label}</p>
                                            <h3 className="app-kpi__value">{stat.value}</h3>
                                            <p className="app-kpi__caption">{stat.caption}</p>
                                        </article>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="home-section home-section--grid">
                    <div className="home-section__header">
                        <span className="app-badge">Highlights</span>
                        <h3 className="mb-0">Mejoras visibles en la experiencia</h3>
                    </div>

                    <div className="row g-3 mx-0 mt-1">
                        {highlights.map((item) => (
                            <div className="col-12 col-lg-4 px-0" key={item.title}>
                                <article className="app-card app-grid-card">
                                    <div className="app-grid-card__icon">{item.icon}</div>
                                    <h3 className="app-grid-card__title">{item.title}</h3>
                                    <p className="app-grid-card__text">{item.text}</p>
                                </article>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </AppBackground>
    )
}

export default Home