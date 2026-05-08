import { useState, useEffect } from 'react';
import { AppBackground } from "../../../../components"

function UpdateExpense() {
    const [expenses, setExpenses] = useState([]);
    const [selectedExpenseId, setSelectedExpenseId] = useState(null);
    const [updating, setUpdating] = useState(false);
    const [categoriesOptions, setCategoriesOptions] = useState([]);
    const [formData, setFormData] = useState({
        concepto: '',
        categoria: '',
        importe: '',
        fecha: '',
        notas: ''
    });

    // Cargar categorías e ingresos desde API
    useEffect(() => {
        fetchCategories();
        fetchExpenses();
    }, []);

    const fetchCategories = async () => {
        try {
            if (categoriesOptions.length === 0) {
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
        } catch (err) {
            console.error(err);
        }
    };

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

    const handleSelectExpense = (expenseId) => {
        if (selectedExpenseId === expenseId) {
            setSelectedExpenseId(null);
            setFormData({
                concepto: '',
                categoria: '',
                importe: '',
                fecha: '',
                notas: ''
            });
        } else {
            setSelectedExpenseId(expenseId);
            const selected = expenses.find(rev => rev.id === expenseId);
            if (selected) {
                setFormData({
                    concepto: selected.concepto,
                    categoria: selected.categoria,
                    importe: Math.abs(selected.importe), // Mostrar como positivo en el input
                    fecha: selected.fecha.split('T')[0], // Formato YYYY-MM-DD
                    notas: selected.notas || ''
                });
            }
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleUpdate = async () => {
        if (selectedExpenseId === null) return;

        setUpdating(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/expenses/edit/${selectedExpenseId}`, {
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...formData,
                    importe: -Math.abs(parseFloat(formData.importe)) // Enviar como negativo
                })
            })
            const result = await response.json();
            console.log("Respuesta del servidor", result)

            // Actualizar la lista con los nuevos datos
            setExpenses(expenses.map(rev =>
                rev.id === selectedExpenseId
                    ? {
                        ...rev,
                        ...formData,
                        importe: -Math.abs(parseFloat(formData.importe)),  // ← Siempre negativo
                        categoria: parseInt(formData.categoria),
                        fecha: new Date(formData.fecha).toISOString()
                    }
                    : rev
            ));

            setSelectedExpenseId(null);
            setFormData({
                concepto: '',
                categoria: '',
                importe: '',
                fecha: '',
                notas: ''
            });
        } catch (err) {
            console.error(err);
        } finally {
            setUpdating(false);
        }
    };

    return (
        <AppBackground
            title={"Update Expense"}
            whiteDivStyle={"d-flex flex-column justify-content-around align-items-center"}>

            <div className="w-100 px-3 px-md-0 py-4" style={{ maxWidth: '900px' }}>
                <div className="row g-3">
                    {/* Expenses List - Left Column */}
                    <div className="col-lg-8">
                        <div className="card" style={{ borderRadius: '16px', height: '100%' }}>
                            <div className="card-body p-0">
                                {expenses.length === 0 ? (
                                    <div className="p-4 text-center text-muted">
                                        No expenses registered
                                    </div>
                                ) : (
                                    <ul className="list-group list-group-flush">
                                        {expenses.map((expense) => (
                                            <li
                                                key={expense.id}
                                                onClick={() => handleSelectExpense(expense.id)}
                                                className={`list-group-item d-flex justify-content-between align-items-start ${selectedExpenseId === expense.id ? 'bg-light border-start border-primary border-4' : ''
                                                    }`}
                                                style={{ cursor: 'pointer', transition: 'all 0.2s' }}
                                            >
                                                <div className="flex-grow-1">
                                                    <div className="d-flex align-items-center gap-2 mb-2">
                                                        <h6 className="mb-0 fw-bold">
                                                            {expense.concepto}
                                                        </h6>
                                                        <span className="badge bg-secondary">
                                                            {categoriesOptions.find(cat => cat.id === expense.categoria)?.categoria}
                                                        </span>
                                                    </div>
                                                    <div className="small text-muted">
                                                        <span className="me-3">📅 {new Date(expense.fecha).toLocaleDateString('en-US')}</span>
                                                        {expense.notas && (
                                                            <span className="fst-italic">"{expense.notas}"</span>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="text-end ms-2">
                                                    <h5 className="mb-0 text-danger fw-bold">
                                                        {parseFloat(expense.importe).toFixed(2)}€
                                                    </h5>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Update Section - Right Column */}
                    {expenses.length > 0 && (
                        <div className="col-lg-4">
                            <div className="card" style={{ borderRadius: '16px' }}>
                                <div className="card-body">
                                    <h5 className="card-title mb-3">
                                        Edit Expense
                                    </h5>

                                    {selectedExpenseId !== null ? (
                                        <div className="alert alert-info mb-3">
                                            <p className="mb-2 fw-bold">Update this expense</p>

                                            <div className="mb-2">
                                                <label className="form-label small mb-1">Concept</label>
                                                <input
                                                    type="text"
                                                    name="concepto"
                                                    value={formData.concepto}
                                                    onChange={handleInputChange}
                                                    className="form-control form-control-sm"
                                                    placeholder="Enter concept"
                                                />
                                            </div>

                                            <div className="mb-2">
                                                <label className="form-label small mb-1">Category</label>
                                                <select
                                                    name="categoria"
                                                    value={formData.categoria}
                                                    onChange={handleInputChange}
                                                    className="form-control form-control-sm"
                                                >
                                                    <option value="" disabled>Select a category</option>
                                                    {categoriesOptions.map((cat) => (
                                                        <option key={cat.id} value={cat.id}>
                                                            {cat.categoria}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div className="mb-2">
                                                <label className="form-label small mb-1">Amount (€)</label>
                                                <input
                                                    type="number"
                                                    name="importe"
                                                    value={formData.importe}
                                                    onChange={handleInputChange}
                                                    className="form-control form-control-sm"
                                                    placeholder="0.00"
                                                    step="0.01"
                                                />
                                            </div>

                                            <div className="mb-2">
                                                <label className="form-label small mb-1">Date</label>
                                                <input
                                                    type="date"
                                                    name="fecha"
                                                    value={formData.fecha}
                                                    onChange={handleInputChange}
                                                    className="form-control form-control-sm"
                                                />
                                            </div>

                                            <div className="mb-2">
                                                <label className="form-label small mb-1">Notes</label>
                                                <textarea
                                                    name="notas"
                                                    value={formData.notas}
                                                    onChange={handleInputChange}
                                                    className="form-control form-control-sm"
                                                    placeholder="Enter notes"
                                                    rows="2"
                                                />
                                            </div>
                                        </div>
                                    ) : (
                                        <p className="text-muted mb-3">
                                            Click on a expense to select it
                                        </p>
                                    )}

                                    <button
                                        onClick={handleUpdate}
                                        disabled={selectedExpenseId === null || updating}
                                        className={`btn w-100 ${selectedExpenseId !== null && !updating
                                            ? 'btn-primary'
                                            : 'btn-secondary'
                                            }`}
                                        style={{ borderRadius: '8px' }}
                                    >
                                        {updating ? 'Updating...' : 'UPDATE'}
                                    </button>

                                    {selectedExpenseId === null && (
                                        <p className="text-center text-muted small mt-2 mb-0">
                                            Select a expense to edit it
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

            </div>

        </AppBackground>
    )
}

export default UpdateExpense