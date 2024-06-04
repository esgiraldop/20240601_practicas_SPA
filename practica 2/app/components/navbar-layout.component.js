import { navigateTo } from "../router"

export function NavbarLayout(pageContent, logic){
    const $root = document.getElementById("root")
    $root.innerHTML = `
        <nav id="navbar">
            <button id="productsBttn">Products</button>
            <button id="ordersBttn">Orders</button>
            <button id="logoutBttn">Log out</button>
        </nav>
        ${pageContent}
    `
    logic()

    const $logout = document.getElementById("logoutBttn")
    $logout.addEventListener('click', ()=>{
        localStorage.removeItem('token')
        localStorage.removeItem('role')
        navigateTo('/login')
    })
    return
}