import { encryptData } from '../../../../encrypt'
import { navigateTo } from '../../../Router'
import { fetchApi } from '../../../helpers/fetch-api'
import styles from '../../../helpers/styles.css'

export function registerScene(){
    const $root = document.getElementById("root")
    $root.innerHTML = `
    <form class=${styles.formContainer}>
        <input type="text" placeholder="username">
        <input type="email" placeholder="johndoe@example.com" autocomplete="email">
        <input type="password" placeholder="password" autocomplete="current-password">
        <button type="submit">Register</button>
    </form>
    `
    const $form = document.getElementsByTagName("form")[0]

    $form.addEventListener('submit', async e =>{
        e.preventDefault()

        const $username = document.querySelector("input[type=text]")
        const $email = document.querySelector("input[type=email]")
        const $password = document.querySelector("input[type=password]")
        console.log("$username: ", $username)
        if(!$username.value || !$email.value || !$password.value){
            alert("Please enter all the fields")
            return
        }
        const userByEmail = await fetchApi(`http://localhost:3000/users?email=${$email.value}`, {})
        if(userByEmail.length > 0){
            alert("The user email is already in use. Please try with another email")
            return
        }
        let negMsg = "The register was not successful. Please try again"
        let posMsg = "The registration was sucessful!"
        const data = await fetchApi('http://localhost:3000/users', {
            method: 'POST',
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                name: $username.value,
                email: $email.value,
                password: encryptData($password.value)
            })
        }, negMsg, posMsg)
        if(data){
            navigateTo('/login')
        }
    })
}