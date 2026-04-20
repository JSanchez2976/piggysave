import { Link } from "react-router-dom"

function AnalysisOptions({routes}){
    return(
         <div className="container text-center">
            {/* g-3: espacio entre tarjetas
               justify-content-center: por si acaso 
            */}
            <div className="row g-5 justify-content-center">

                {/* col-12: ocupa todo el ancho en móvil 
                   col-md-4: se pone a un tercio en PC
                */}
                <div className="col-12 col-md-4">
                    <Link
                        to={routes.createRoute}
                        className="text-decoration-none d-block rounded-pill border border-3 border-primary p-4 bg-light shadow-sm w-100 text-center"
                    >
                        <h2 className="fs-4 fw-bold text-primary m-0">
                            CREATE
                        </h2>
                    </Link>
                </div>

                <div className="col-12 col-md-4">
                    <Link
                        to={routes.updateRoute}
                        className="text-decoration-none d-block rounded-pill border border-3 border-success p-4 bg-light shadow-sm w-100 text-center"
                    >
                        <h2 className="fs-4 fw-bold text-success m-0">
                            UPDATE
                        </h2>
                    </Link>
                </div>

                    <div className="col-12 col-md-4">
                    <Link
                        to={routes.deleteRoute}
                        className="text-decoration-none d-block rounded-pill border border-3 border-danger p-4 bg-light shadow-sm w-100 text-center"
                    >
                        <h2 className="fs-4 fw-bold text-danger m-0">
                            DELETE
                        </h2>
                    </Link>
                </div>

            </div>
        </div>
    )
}

export default AnalysisOptions