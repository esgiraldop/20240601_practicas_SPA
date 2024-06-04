import { NavbarLayout } from "./components/navbar-layout.component"
import { routes } from "./helpers/routes"

export function navigateTo(pathname){
    window.history.pushState({}, '', window.location.origin + pathname)
    router()
}

export function router(){
    const pathname = window.location.pathname
    const params = new URLSearchParams(window.location.search)
    const token = localStorage.getItem('token')
    const usrRole = localStorage.getItem('role')

    if(pathname === "/" || pathname === "/login" || pathname === "/register"){
        if(token){
            navigateTo("/dashboard")
            return
        }
    }

    const publicRoute = routes.public.find(path => path.path === pathname)

    const privateRoute = routes.private.find(path => path.path === pathname)

    if(publicRoute){
        publicRoute.scene()
        return
    }
    console.log("privateRoute: ", privateRoute)
    if(privateRoute){
        if(token && usrRole){
            if(!privateRoute.roles.includes(usrRole)){
                navigateTo('/notFound')
                return
            }
            const {pageContent, logic} = privateRoute.scene()
            NavbarLayout(pageContent, logic)
            return
        }
        navigateTo('/login')
        return
    }
    navigateTo('/notFound')
}