import { fetchApi } from '../../../helpers/fetch-api'
import styles from './tasks.styles.css'
import { navigateTo } from '../../../Router'

export function tasksScene(){
    const pageContent = `
    <div class="${styles.container}">
        <form class="${styles.create_form}" id="tasks_form">
            <label for="title">Title</label>
            <input type="text" name="title">

            <label for="description">Description</label>
            <input name = "description" type="text">

            <label for="priority">Priority</label>
            <select>
                <option value="1">Low</option>
                <option value="2">Medium</option>
                <option value="3">High</option>
            </select>

            <label for="date">Delivery date</label>
            <input type="date" name="date">

            <button class="${styles.create_form_elem}">Save</button>
        </form>
        <div class="${styles.tasks_list}" id="tasks_list">
            <!-- Insert tasks list here -->
        </div>
    </div>
    `
    const logic = async () =>{
        const negMsg = "No tasks could be retrieved"
        const tasks = await fetchApi('http://localhost:3000/tasks', {}, negMsg)
        if(tasks.length < 1){
            return ""
        }
        const $tasksList = document.getElementById("tasks_list")
        $tasksList.innerHTML = `
            <ul>
                ${tasks.map(elem => {
                    return `<li>
                                ${elem.title}
                                <button id="${elem.id}" action="edit">Edit</button>
                                <button id="${elem.id}" action="delete">Delete</button>
                                <button id="${elem.id}" action="preview">Preview</button>
                                <button id="${elem.id}" action="deactivate">Deactivate</button>
                            </li>`
                }).join('')}
            </ul>
        `
        // Adding event listeners to each of the buttons
        const $editButtons = document.querySelectorAll("button[action=edit]")
        const $editButtonsArray = [...$editButtons]

        const $deleteButtons = document.querySelectorAll("button[action=delete]")
        const $deleteButtonsArray = [...$deleteButtons]

        const $previewButtons = document.querySelectorAll("button[action=preview]")
        const $previewButtonsArray = [...$previewButtons]

        const $deacButtons = document.querySelectorAll("button[action=deactivate]")
        const $deacButtonsArray = [...$deacButtons]
        
        $editButtonsArray.forEach($editBttn => {
            $editBttn.addEventListener('click', () => navigateTo(`/tasks/editTask?taskId=${$editBttn.id}`))
        })

        $deleteButtonsArray.forEach($deleteBttn => {
            $deleteBttn.addEventListener('click', async () => {
                const negMsg = `The task with id ${$deleteBttn.id} could not be deleted`
                const posMsg = `The task with id ${$deleteBttn.id} was deleted succesfully`
                await fetchApi(`http://localhost:3000/tasks/${$deleteBttn.id}`, {
                    method: 'DELETE',
                    headers:{
                        "Content-Type": "application/json"
                    }
                }, negMsg, posMsg)
                const $liItem = $deleteBttn.parentElement
                $liItem.parentElement.removeChild($liItem)
            })})

        $previewButtonsArray.forEach($previewBttn => {
            $previewBttn.addEventListener('click', () =>{
                    alert(`You clicked on preview of task ${$previewBttn.id}`)
            })})

        $deacButtonsArray.forEach($deacBttn => {
            $deacBttn.addEventListener('click', async () =>{  
                const negMsg = `The task with id ${$deacBttn.id} could not be deactivated`
                const posMsg = `The task with id ${$deacBttn.id} was deactivated succesfully`
                const response = await fetchApi(`http://localhost:3000/tasks/${$deacBttn.id}`, {
                    method: 'PATCH',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        active: false,
                    })
                }, negMsg, posMsg)
            })})
    }
    
    return {pageContent, logic}
}