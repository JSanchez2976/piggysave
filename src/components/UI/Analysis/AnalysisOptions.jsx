import { Link } from "react-router-dom"

const defaultActions = [
    { key: "create", title: "Create", text: "Add a new record", tone: "create" },
    { key: "update", title: "Update", text: "Edit existing data", tone: "update" },
    { key: "delete", title: "Delete", text: "Remove a wrong item", tone: "delete" },
]

function AnalysisOptions({routes, sectionName="records"}){
    const actions = defaultActions.map((action) => ({
        ...action,
        route:
            action.key === "create"
                ? routes.createRoute
                : action.key === "update"
                    ? routes.updateRoute
                    : routes.deleteRoute,
    }))

    return(
         <div className="container-fluid text-center px-0">
            <div className="row g-3 justify-content-center">
                {actions.map((action) => (
                    <div className="col-12 col-md-4" key={action.key}>
                    <Link
                        to={action.route}
                        className={`analysis-action text-decoration-none d-block w-100 text-start analysis-action--${action.tone}`}
                    >
                        <span className="analysis-action__chip">{action.title}</span>
                        <h2 className="analysis-action__title m-0 text-uppercase">{action.title}</h2>
                        <p className="analysis-action__text mb-0">{action.text} in {sectionName}</p>
                    </Link>
                </div>
                ))}
            </div>
        </div>
    )
}

export default AnalysisOptions