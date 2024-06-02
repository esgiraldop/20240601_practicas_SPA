import styles from './notFound.styles.css'

export function notFoundScene(){
    const root = document.getElementById("root")
    if(!root){
        throw new Error("There was a problem trying to load de element 'root' in the script notFound")
    }
    root.innerHTML = `
        <div class="${styles.container}">
            <h1>404 Not found</h1>
            <p>Sorry, the page you are looking for does not exist.</p>
        </div>
    `
}