export function dashboardScene(){
    const pageContent = "Hello from dashboard"

    const logic = () => {
        console.log("Hello from dashboard")
    }

    return {pageContent, logic}
}