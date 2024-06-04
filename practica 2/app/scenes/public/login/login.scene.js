import styles from '../../../helpers/styles.css'
import globalStyles from '../../../helpers/styles.css'

export function loginScene(){
    const $root = document.getElementById("root")
    $root.innerHTML = `
        <form class="formContainer">
            <h2>login</h2>
            <p>This is a form for logging in</p>
        </form>
    `
}