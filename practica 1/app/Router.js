import { NavbarLayout } from "./components/navbar-layout.component"
import { routes } from "./helpers/routes"

export function Router(){
    const path = window.location.pathname

    const token = localStorage.getItem('token')
    if(path === '/login' || path === '/register' || path === '/'){
        if(token){
            //If the user is logged in and tries to acces either login or registration, he will be taken to tasks
            console.log("Navigating to tasks")
            navigateTo('/tasks')
            return
        }
        if(!token && path === '/'){
            navigateTo('/login')
            return
        }
    }

    const publicRoute = routes.public.find(route => route.path === path)
    const privateRoute = routes.private.find(route => route.path === path)
    if(publicRoute){
        publicRoute.scene()
        return
    }
    if(privateRoute){
        if(token){
            const {pageContent, logic} = privateRoute.scene()
            NavbarLayout(pageContent, logic)
            return
        }
        navigateTo('/login')
        return
    }
    navigateTo('/notFound')
}

export function navigateTo(path){
    window.history.pushState({}, '', window.location.origin + path)
    Router()
}