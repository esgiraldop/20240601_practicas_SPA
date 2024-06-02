import { routes } from "./helpers/routes"
import { notFoundScene } from "./scenes/public/notFound/notFound.scene"

export function Router(){
    const path = window.location.pathname

    const token = localStorage.getItem('token')
    if(path === '/login' || path === '/register'){
        if(token){
            console.log("Navigating to tasks")
            navigateTo('/tasks')
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
        privateRoute.scene()
        return
    }
    navigateTo('/notFound')
}

export function navigateTo(path){
    window.history.pushState({}, '', window.location.origin + path)
    Router()
}