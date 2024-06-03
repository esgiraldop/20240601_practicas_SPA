import styles from './users.styles.css'

export function usersScene(){
    const pageContent = `
       <p>Hello from users</p>
    `
    const logic = () =>{
        console.log("Executing the logic users")
    }
    return {pageContent, logic}
}