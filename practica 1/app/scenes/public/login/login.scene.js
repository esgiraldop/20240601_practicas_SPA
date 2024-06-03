import { decryptData } from '../../../../encrypt'
import { navigateTo } from '../../../Router'
import { fetchApi } from '../../../helpers/fetch-api'
import styles from './login.styles.css'

export function loginScene(){
    const root = document.getElementById("root")
    root.innerHTML = `
        <form class=${styles.formContainer}>
            <h2>Log in</h2>
            <input type="email" placeholder="johndoe@example.com" autocomplete="email">
            <input type="password" placeholder="password" autocomplete="current-password">
            <button type="submit">Login</button>
        </form>
    `
    const $form = document.getElementsByTagName("form")[0]
    
    $form.addEventListener('submit', async e =>{
        e.preventDefault()

        const $email = document.querySelector("input[type=email]")
        const $password = document.querySelector("input[type=password]")
        if(!$email.value || !$password.value){
            alert("Please enter all the fields")
            return
        }
        // Checking the email exists
        const dataArray = await fetchApi(`http://localhost:3000/users?email=${$email.value}`, {})
        const data = dataArray[0]
        if(!data){
            alert("The user does not exist. Please register first")
            return
        }
        if(decryptData(data.password) !== $password.value){
             alert("Please enter a valid password")
             return
         }
        alert(`Welcome to our webpage ${data.name}!`)
        const token = Math.random().toString(36).substring(2)
        localStorage.setItem('token', token)
        navigateTo('/tasks')
    })
}