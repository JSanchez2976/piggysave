import { useState, useEffect } from 'react';
import { AppBackground } from "../../../../components"
import { useNavigate } from 'react-router-dom';

function DeleteExpense() {
    const navigate = useNavigate()
    const [expenses, setExpenses] = useState([]);
    const [selectedExpenseId, setSelectedExpenseId] = useState(null);
    const [deleting, setDeleting] = useState(false);

    // Cargar gastos desde API
    useEffect(() => {
        fetchExpenses();
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

    const handleDelete = async () => {
        if (selectedExpenseId === null) return;

        setDeleting(true);
        try {
            const expenseToDelete = expenses.find(exp => exp.id === selectedExpenseId);
            const expenseId = expenseToDelete.id

            const response = await fetch(`${import.meta.env.VITE_API_URL}/expenses/delete/${expenseId}`, {
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                }
            })
            const result = await response.json();
            console.log("Respuesta del servidor", result)
            // Si la API responde correctamente, eliminar de la lista
            setExpenses(expenses.filter(exp => exp.id !== selectedExpenseId));
            setSelectedExpenseId(null);
        } catch (err) {
            console.error(err);
        } finally {
            setDeleting(false);
        }
    };

    return (
        <AppBackground
            title={"Delete Expense"}
            whiteDivStyle={"d-flex flex-column justify-content-around align-items-center"}>

            <div className="w-100 px-3 px-md-0 py-4" style={{ maxWidth: '900px' }}>
                <div className="row g-3">
                    {/* Gastos List - Left Column */}
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
                                                onClick={() => setSelectedExpenseId(selectedExpenseId === expense.id ? null : expense.id)}
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
                                                            {expense.categoria}
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
                                                        {expense.importe.toFixed(2)}€
                                                    </h5>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Delete Section - Right Column */}
                    {expenses.length > 0 && (
                        <div className="col-lg-4">
                            <div className="card" style={{ borderRadius: '16px' }}>
                                <div className="card-body">
                                    <h5 className="card-title mb-3">
                                        Confirm Delete
                                    </h5>

                                    {selectedExpenseId !== null ? (
                                        <div className="alert alert-warning mb-3">
                                            <p className="mb-2 fw-bold">Delete this expense?</p>
                                            <div className="bg-white p-2 rounded small">
                                                <p className="mb-1">
                                                    <strong>{expenses.find(exp => exp.id === selectedExpenseId)?.concepto}</strong> -
                                                    <span className="text-danger fw-bold ms-2">
                                                        {expenses.find(exp => exp.id === selectedExpenseId)?.importe.toFixed(2)}€
                                                    </span>
                                                </p>
                                                <p className="mb-0 text-muted">
                                                    {new Date(expenses.find(exp => exp.id === selectedExpenseId)?.fecha).toLocaleDateString('en-US')}
                                                </p>
                                            </div>
                                        </div>
                                    ) : (
                                        <p className="text-muted mb-3">
                                            Click on an expense to select it
                                        </p>
                                    )}

                                    <button
                                        onClick={handleDelete}
                                        disabled={selectedExpenseId === null || deleting}
                                        className={`btn w-100 ${selectedExpenseId !== null && !deleting
                                            ? 'btn-danger'
                                            : 'btn-secondary'
                                            }`}
                                        style={{ borderRadius: '8px' }}
                                    >
                                        {deleting ? 'Deleting...' : 'DELETE'}
                                    </button>

                                    {selectedExpenseId === null && (
                                        <p className="text-center text-muted small mt-2 mb-0">
                                            Select an expense to delete it
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
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

export default DeleteExpense