import { useEffect, useState } from "react"
import { AppBackground } from "../../../../components"
import { useNavigate } from "react-router-dom"


function CreateExpense() {
    const navigate = useNavigate()
    const [date, setDate] = useState("")
    const [concept, setConcept] = useState("")
    const [categorie, setCategorie] = useState("")
    const [amount, setAmount] = useState(0)
    const [notes, setNotes] = useState("")
    const [categoriesOptions, setCategoriesOptions] = useState([])

    // TENER CUIDADO YA QUE SE LLAMA DOS VECES
    // cargar las categorias
    useEffect(() => {
        const fetchCategories = async () => {
            if (categoriesOptions.length == 0) {     // lista vacia
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
                console.log(data)
                console.log(categoriesOptions);
            }
        }

        fetchCategories()
    }, [])  // con los [] para q solo se haga una vez

    const handleSubmit = async (e) => {
        e.preventDefault()  // q no recargue la pagina

        // COMPROBACIONES
        if (!date) return alert("Fill in the date field")
        if (!concept) return alert("Fill in the concept field")
        if (!categorie) return alert("Fill in the categorie field")
        if (!amount) return alert("Fill in the amount field")

        // no hay comprobacion a notes, ya que es un campo opcional
        const expense = {
            fecha: date,    // formatear
            concepto: concept,
            categoria: categorie,
            importe: amount * -1, // al ser gasto tiene q entrar en negativo
            notas: notes
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/revenue/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(expense),
            });

            if (response.ok) {
                const result = await response.json();
                console.log("Respuesta del servidor ",result)

                setDate("");
                setConcept("");
                // setCategorie("");    // no se pone porque sino no se elige una correctamente
                setAmount(0);
                setNotes("");
            }

        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <AppBackground
            title={"Create Expense"}
            whiteDivStyle={"d-flex flex-column justify-content-start align-items-center p-5 gap-2 "}>

            <form className="d-flex flex-column justify-content-start align-items-center p-5 gap-md-3 gap-2 vw-100 "
                onSubmit={handleSubmit}>
                Date:
                <input type="date" className="cust-input rounded" value={date}
                    onChange={(e) => setDate(e.target.value)}
                    ></input>

                Concept:
                <input type="text" className="cust-input rounded" value={concept}
                    onChange={(e) => setConcept(e.target.value)}
                    placeholder="Investments" ></input>

                Categorie:
                <select
                    className="cust-input rounded"
                    onChange={(e) => setCategorie(e.target.value)}
                    defaultValue=""
                >
                    {/* Cambiar luego por las categorias disponibles */}
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
                <input type="text" className="cust-input rounded " value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                ></input>

                <div className="mt-4 gap-4 d-flex">
                    <button
                        type="button"
                        className="btn btn-danger rounded-pill w-50 px-5 fw-bold"
                        onClick={() => navigate(-1)} // Esto vuelve a la página anterior
                    >
                        BACK
                    </button>

                    <button type="submit" className="btn btn-success rounded-pill w-50 px-5 fw-bold">
                        CREATE
                    </button>
                </div>
            </form>
        </AppBackground >
    )
}

export default CreateExpense