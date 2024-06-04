import { fetchApi } from '../../../helpers/fetch-api'
import styles from './editTask.styles.css'
import { navigateTo } from '../../../Router'

export function editTaskScene(params){

    const pageContent = `
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
    `

    const logic = async () =>{
        const taskId = params.get('taskId')
        // Getting the info of the task from the database
        const negMsg = `No task with id ${taskId} could be retrieved. Please try with another id`
        const taskDataArray = await fetchApi(`http://localhost:3000/tasks?id=${taskId}`, {}, negMsg)

        if(!taskDataArray.length){
            return ""
        }
        const taskData = taskDataArray[0]
        const $title = document.querySelector("input[name=title]")
        const $description = document.querySelector("input[name=description]")
        const $priority = document.querySelector(`select>option[value="${taskData.Priority}"]`)
        const $date = document.querySelector("input[name=date]")
        
        // Filling the data according to the task in the database
        $title.value = taskData.title
        $description.value = taskData.description
        $priority.selected = true;
        $date.value = taskData["Delivery date"].split("T")[0]
    }

    return {pageContent, logic}
}