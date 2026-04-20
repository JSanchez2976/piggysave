import { AnalysisOptions, AppBackground } from "../../../../components"

const routes = {
    createRoute:"/analysis/expenses/create",
    updateRoute:"/analysis/expenses/update",
    deleteRoute:"/analysis/expenses/delete"
}

function Expenses() {
    return (
        <AppBackground 
        title={"Expenses"} 
        greenDivStyle={"d-flex flex-column justify-content-around align-items-center"}>
            <AnalysisOptions
                routes={routes}
                />
            </AppBackground>
    )
}
export default Expenses