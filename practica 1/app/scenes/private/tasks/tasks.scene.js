import styles from './tasks.styles.css'

export function tasksScene(){
    const pageContent = `
       <p>Hello from tasks</p>
    `
    const logic = () =>{
        console.log("Executing the logic tasks")
    }
    return {pageContent, logic}
}