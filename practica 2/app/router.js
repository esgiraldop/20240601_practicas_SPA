import { routes } from "./routes"

export function navigateTo(pathname){
    window.history.pushState({}, '', window.location.origin + pathname)
    router()
}

export function router(){
    const pathname = window.location.pathname
    const params = new URLSearchParams(window.location.search)
    const token = localStorage.getItem('token')

    if(pathname === "/" || pathname === "/login"){
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
    if(privateRoute){
        if(token){
            privateRoute.scene()
            return
        }
        navigateTo('/login')
        return
    }
    navigateTo('/notFound')
}