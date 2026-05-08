import { useState, useEffect } from 'react';
import { AppBackground } from "../../../../components"

function UpdateRevenue() {
    const [revenues, setRevenues] = useState([]);
    const [selectedRevenueId, setSelectedRevenueId] = useState(null);
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
        fetchRevenues();
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

    const handleSelectRevenue = (revenueId) => {
        if (selectedRevenueId === revenueId) {
            setSelectedRevenueId(null);
            setFormData({
                concepto: '',
                categoria: '',
                importe: '',
                fecha: '',
                notas: ''
            });
        } else {
            setSelectedRevenueId(revenueId);
            const selected = revenues.find(rev => rev.id === revenueId);
            if (selected) {
                setFormData({
                    concepto: selected.concepto,
                    categoria: selected.categoria,
                    importe: selected.importe,
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
        if (selectedRevenueId === null) return;

        setUpdating(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/revenue/edit/${selectedRevenueId}`, {
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData)
            })
            const result = await response.json();
            console.log("Respuesta del servidor", result)

            // Actualizar la lista con los nuevos datos
            const categoryName = categoriesOptions.find(cat => cat.id === parseInt(formData.categoria))?.categoria;
            setRevenues(revenues.map(rev =>
                rev.id === selectedRevenueId
                    ? {
                        ...rev,
                        ...formData,
                        importe: parseFloat(formData.importe),  
                        categoria: parseInt(formData.categoria),
                        fecha: new Date(formData.fecha).toISOString()
                    }
                    : rev
            ));

            setSelectedRevenueId(null);
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
            title={"Update Revenue"}
            whiteDivStyle={"d-flex flex-column justify-content-around align-items-center"}>

            <div className="w-100 px-3 px-md-0 py-4" style={{ maxWidth: '900px' }}>
                <div className="row g-3">
                    {/* Revenues List - Left Column */}
                    <div className="col-lg-8">
                        <div className="card" style={{ borderRadius: '16px', height: '100%' }}>
                            <div className="card-body p-0">
                                {revenues.length === 0 ? (
                                    <div className="p-4 text-center text-muted">
                                        No revenues registered
                                    </div>
                                ) : (
                                    <ul className="list-group list-group-flush">
                                        {revenues.map((revenue) => (
                                            <li
                                                key={revenue.id}
                                                onClick={() => handleSelectRevenue(revenue.id)}
                                                className={`list-group-item d-flex justify-content-between align-items-start ${selectedRevenueId === revenue.id ? 'bg-light border-start border-primary border-4' : ''
                                                    }`}
                                                style={{ cursor: 'pointer', transition: 'all 0.2s' }}
                                            >
                                                <div className="flex-grow-1">
                                                    <div className="d-flex align-items-center gap-2 mb-2">
                                                        <h6 className="mb-0 fw-bold">
                                                            {revenue.concepto}
                                                        </h6>
                                                        <span className="badge bg-secondary">
                                                            {categoriesOptions.find(cat => cat.id === revenue.categoria)?.categoria}
                                                        </span>
                                                    </div>
                                                    <div className="small text-muted">
                                                        <span className="me-3">📅 {new Date(revenue.fecha).toLocaleDateString('en-US')}</span>
                                                        {revenue.notas && (
                                                            <span className="fst-italic">"{revenue.notas}"</span>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="text-end ms-2">
                                                    <h5 className="mb-0 text-success fw-bold">
                                                        {revenue.importe.toFixed(2)}€
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
                    {revenues.length > 0 && (
                        <div className="col-lg-4">
                            <div className="card" style={{ borderRadius: '16px' }}>
                                <div className="card-body">
                                    <h5 className="card-title mb-3">
                                        Edit Revenue
                                    </h5>

                                    {selectedRevenueId !== null ? (
                                        <div className="alert alert-info mb-3">
                                            <p className="mb-2 fw-bold">Update this revenue</p>

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
                                            Click on a revenue to select it
                                        </p>
                                    )}

                                    <button
                                        onClick={handleUpdate}
                                        disabled={selectedRevenueId === null || updating}
                                        className={`btn w-100 ${selectedRevenueId !== null && !updating
                                            ? 'btn-primary'
                                            : 'btn-secondary'
                                            }`}
                                        style={{ borderRadius: '8px' }}
                                    >
                                        {updating ? 'Updating...' : 'UPDATE'}
                                    </button>

                                    {selectedRevenueId === null && (
                                        <p className="text-center text-muted small mt-2 mb-0">
                                            Select a revenue to edit it
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

export default UpdateRevenue