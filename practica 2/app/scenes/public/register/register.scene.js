import { navigateTo } from '../../../../../practica 2/app/router'
import { decryptData } from '../../../helpers/encrypt'
import { fetchApi } from '../../../helpers/fetch-api'
import globalStyles from '../../../helpers/styles.css'
import styles from './register.styles.css'

export function registerScene(){
    const $root = document.getElementById("root")
    $root.innerHTML = `
        <form id="loginForm" class="formContainer">
            <h2>Sign up</h2>

            <legend for="username">User name</legend>
            <input id="username" name="username" type="text" placeholder="user name"/>

            <legend for="email">Email</legend>
            <input id="email" name="email" type="email" placeholder="johndoe@example.com" autocomplete="email"/>

            <legend for="password">Password</legend>
            <input id="password" name="password" type="password" autocomplete="current-password"/>
            
            <button>Login</button>
        </form>
    `
}