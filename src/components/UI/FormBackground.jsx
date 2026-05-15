function FormBackground({body,title=""}) {
    return (
        <div className="auth-shell">
            <div className="auth-panel fade-in">
                <div className="auth-hero d-flex flex-column justify-content-end gap-3">
                    <p className="app-shell__eyebrow mb-0">PiggySave access</p>
                    <h1 className="mb-0">{title}</h1>
                    <p>
                        Manten el control de ingresos, gastos y categorias desde una experiencia enfocada en claridad y rapidez.
                    </p>
                </div>

                <div className="auth-body">
                    {body}
                </div>
            </div>
        </div>
    )
}

export default FormBackground