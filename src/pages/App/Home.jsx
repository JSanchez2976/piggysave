import NavBarTop from "../../components/UI/NavBarTop"

function Home() {
    return (
        <div className="vh-100 d-flex flex-column">
            {/* NAVBAR PARA PC (Arriba) */}
            <NavBarTop></NavBarTop>

            {/* NAVBAR PARA MÓVIL (Abajo) */}
            <nav className="navbar navbar-dark bg-primary fixed-bottom d-md-none">
                <div className="container-fluid">
                    <div className="d-flex justify-content-around w-100">
                        <a className="nav-link text-white text-center" href="#">
                            <i className="bi bi-house"></i><br /><small>Inicio</small>
                        </a>
                        <a className="nav-link text-white text-center" href="#">
                            <i className="bi bi-search"></i><br /><small>Buscar</small>
                        </a>
                        <a className="nav-link text-white text-center" href="#">
                            <i className="bi bi-person"></i><br /><small>Perfil</small>
                        </a>
                    </div>
                </div>
            </nav>

            <div className="vw-100 bg-green-solid d-flex justify-content-center align-items-center position-relative px-5"
                style={{ height: "35%" }}>
                <h1 className="text-green-dark"></h1>
            </div>

            <div className="vw-100 bg-white-mint d-flex flex-column justify-content-around align-items-center z-1 position-absolute p-5 gap-3"
                style={{
                    height: "75%",
                    bottom: 0,
                    borderTopRightRadius: "7%",
                    borderTopLeftRadius: "7%"
                }}>

            </div>

        </div>
    )
}

export default Home