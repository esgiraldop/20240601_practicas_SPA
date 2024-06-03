import { navigateTo } from "../Router"
import styles from './navbar-layout.styles.css'

export function NavbarLayout(pageContent, logic){
    const $root = document.getElementById("root")
    $root.innerHTML = `
    <div class="${styles.navbar}">
        <button id="users">Users</button>
        <button id="tasks">Tasks</button>
        <button id="logout">Log out</button>
    </div>
    ${pageContent}
    `
    const $logout = document.getElementById("logout")
    const $users = document.getElementById("users")
    const $tasks = document.getElementById("tasks")

    $logout.addEventListener('click', () => {
        localStorage.removeItem('token')
        navigateTo('/login')
    })
    $users.addEventListener('click', () => {
        navigateTo('/users')
    })
    $tasks.addEventListener('click', () => {
        navigateTo('/tasks')
    })
    logic()
}