import { AnalysisOptions, AppBackground } from "../../../components"

const routes = {
    createRoute:"/analysis/revenues/create",
    updateRoute:"/analysis/revenues/update",
    deleteRoute:"/analysis/revenues/delete"
}

function Revenues() {
    return (
        <AppBackground 
        title={"Revenues"} 
        greenDivStyle={"d-flex flex-column justify-content-around align-items-center"}>
            <AnalysisOptions
                routes={routes}
                />
            </AppBackground>
    )
}
export default Revenues