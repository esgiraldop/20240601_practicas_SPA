export function adminScene(){
    const pageContent = "If you can see this, it's because your are an admin"

    const logic = () => {
        console.log("Hello from dashboard for admins exclusively")
    }

    return {pageContent, logic}
}