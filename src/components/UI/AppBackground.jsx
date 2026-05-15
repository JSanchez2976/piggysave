import NavBarBottom from "./NavBarBottom"
import NavBarTop from "./NavBarTop"

function AppBackground({ children, title, whiteDivStyle="" }) {
    return (
        <div className="app-shell d-flex flex-column">
            <NavBarTop></NavBarTop>
            <NavBarBottom></NavBarBottom>

            <section className="app-shell__hero fade-in">
                <p className="app-shell__eyebrow">PiggySave dashboard</p>
                <h1 className="app-shell__title">{title}</h1>
                <p className="app-shell__subtitle">
                    Gestiona tus finanzas con una interfaz mas clara, rapida y consistente entre analysis, categories y profile.
                </p>
            </section>

            <section className={`app-panel ${whiteDivStyle}`}>
                <div className="app-panel__content">
                    {children}
                </div>
            </section>
        </div>
    )
}

export default AppBackground