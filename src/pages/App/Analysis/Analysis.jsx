import { Link } from "react-router-dom"
import { AppBackground } from "../../../components"


function FillAnalysis() {
    return (
        <div className="container text-center mt-4">
            {/* g-3: espacio entre tarjetas
               justify-content-center: por si acaso 
            */}
            <div className="row g-5 justify-content-center">

                {/* col-12: ocupa todo el ancho en móvil 
                   col-md-6: se pone a la mitad en PC
                */}
                <div className="col-12 col-md-6">
                    <Link
                        to="/analysis/revenues"
                        className="text-decoration-none d-block rounded-pill border border-3 border-primary p-4 bg-light shadow-sm w-100 text-center"
                    >
                        <h2 className="fs-4 fw-bold text-primary m-0">
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
        </div>
    );
}

function Analysis() {
    return (
        <AppBackground title={"Analysis"} greenDivStyle={"d-flex flex-column justify-content-around align-items-center"}><FillAnalysis /></AppBackground>
    )
}

export default Analysis