import { useEffect, useState } from "react"
import { AppBackground } from "../../../../components"
import { useNavigate } from "react-router-dom"

function CreateRevenue() {
    const navigate = useNavigate()
    const [date, setDate] = useState("")
    const [concept, setConcept] = useState("")
    const [categorie, setCategorie] = useState("")
    const [amount, setAmount] = useState(0)
    const [notes, setNotes] = useState("")
    const [categoriesOptions, setCategoriesOptions] = useState([])

    useEffect(() => {
        const fetchCategories = async () => {
            if (categoriesOptions.length == 0) {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/categories/category/`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("token")}`,
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) {
                    throw new Error(`Error en la petición: ${response.status}`);
                }
                const data = await response.json();
                setCategoriesOptions(data)
            }
        }

        fetchCategories()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!date) return alert("Fill in the date field")
        if (!concept) return alert("Fill in the concept field")
        if (!categorie) return alert("Fill in the categorie field")
        if (!amount) return alert("Fill in the amount field")

        const revenue = {
            fecha: date,
            concepto: concept,
            categoria: categorie,
            importe: amount, // positivo, es un ingreso
            notas: notes
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/revenue/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(revenue),
            });

            if (response.ok) {
                const result = await response.json();
                console.log("Respuesta del servidor ", result)

                setDate("");
                setConcept("");
                setAmount(0);
                setNotes("");
            }

        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <AppBackground
            title={"Create Revenue"}
            whiteDivStyle={"d-flex flex-column justify-content-start align-items-center p-5 gap-2 "}>

            <form className="d-flex flex-column justify-content-start align-items-center p-5 gap-md-3 gap-2 vw-100"
                onSubmit={handleSubmit}>
                Date:
                <input type="date" className="cust-input rounded" value={date}
                    onChange={(e) => setDate(e.target.value)}></input>

                Concept:
                <input type="text" className="cust-input rounded" value={concept}
                    onChange={(e) => setConcept(e.target.value)}
                    placeholder="Salary" ></input>

                Categorie:
                <select
                    className="cust-input rounded"
                    onChange={(e) => setCategorie(e.target.value)}
                    defaultValue=""
                >
                    <option value="" disabled>Choose a categorie</option>
                    {categoriesOptions.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.categoria}
                        </option>
                    ))}
                </select>

                Amount:
                <input type="number" step="0.01" className="cust-input rounded" value={amount}
                    onChange={(e) => setAmount(e.target.value)}></input>

                Notes:
                <input type="text" className="cust-input rounded" value={notes}
                    onChange={(e) => setNotes(e.target.value)}></input>

                <div className="mt-4 gap-4 d-flex">
                    <button
                        type="button"
                        className="btn btn-danger rounded-pill w-50 px-5 fw-bold"
                        onClick={() => navigate(-1)}
                    >
                        BACK
                    </button>

                    <button type="submit" className="btn btn-success rounded-pill w-50 px-5 fw-bold">
                        CREATE
                    </button>
                </div>
            </form>
        </AppBackground>
    )
}

export default CreateRevenue