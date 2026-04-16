function NavBarBottom() {
    return (
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
    )
}

export default NavBarBottom