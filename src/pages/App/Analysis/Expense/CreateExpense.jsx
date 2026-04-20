import { AppBackground } from "../../../../components"

function CreateExpense() {
    return (
        <AppBackground
            title={"Create Expense"}
            whiteDivStyle={"d-flex flex-column justify-content-start align-items-center p-5 gap-2 "}>

            <form className="d-flex flex-column justify-content-start align-items-center p-5 gap-md-3 gap-2 vw-100 "
                    onSubmit="">
                Date:
                <input type="date" className="cust-input rounded"
                    onChange={(e) => setuserName(e.target.value)}
                    placeholder="YYYY-MM-DD" ></input>

                Concept:
                <input type="text" className="cust-input rounded"
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
                    <option value="1">Comida</option>
                    <option value="2">Alquiler</option>
                    <option value="3">Sueldo</option>
                    <option value="4">Ocio</option>
                </select>

                Amount:
                <input type="text" className="cust-input rounded"
                    onChange={(e) => setuserName(e.target.value)}></input>
                Notes:
                <input type="text" className="cust-input rounded"
                    onChange={(e) => setuserName(e.target.value)}
                ></input>

                <div className="mt-4">
                <button type="submit" className="btn btn-success rounded-pill w-100 px-5 fw-bold">
                    CREATE
                </button>
            </div>
            </form>
        </AppBackground >
    )
}

export default CreateExpense