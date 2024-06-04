import { fetchApi } from '../../../helpers/fetch-api'
import styles from './users.styles.css'

const buildModal = (userTask, usrData) => {
    // Modals for the previews of the tasks
    const modalDiv = document.getElementById('myModal')
    modalDiv.innerHTML = `
        <!-- Modal content -->
        <div class="${styles["modal-content"]}">
            <span class="${styles.close}" id="close_modal">&times;</span>
            <h2>${userTask.title}</h2>
            <h4>Description: </h4>
            <p>${userTask.description}</p>
            <h4>Priority: </h4>
            <p>${userTask.Priority}</p>
            <h4>Delivery date: </h4>
            <p>${userTask["Delivery date"]}</p>
            <h4>Assigned to: </h4>
            <p>${usrData.name}</p>
        </div>
    `
    modalDiv.style.display = "block"

    // Getting the element that closes the modal
    const $close_modal = document.getElementById("close_modal")
    $close_modal.addEventListener('click', () => {
        modalDiv.style.display = "none"
    })
}

export function usersScene(){
    const pageContent = `
       <div class="${styles.container}">
        <div>
            <h2>Users</h2>
            <div class="${styles.users_container}" id="users_container">
                <!--Insert all the users here-->
            </div>
        </div>
        <div>
            <h2>Tasks</h2>
            <button disabled id="toggleButtn">Selected user</button>
            <div class="${styles.tasks_element}" id="tasks_container">
                <!--Insert the tasks associated to each user here-->
                <p>Select any of the users at the left to display a list of tasks</p>
            </div>
        </div>
       </div>
       <div id="myModal" class="${styles.modal}"></div> <!-- Add the modal here -->
    `
    const logic = async () => {
        // Content for users
        const $usersContainer = document.getElementById("users_container")
        const negMsg = "User could not be retrieved"
        const usrsData = await fetchApi('http://localhost:3000/users', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        }, negMsg)
        // Displaying content for users
        $usersContainer.innerHTML = `
            <ul>
                ${usrsData.map(usrData => {
                    return `<li>
                        ${usrData.name}
                        <button name="showUserTasks" id=${usrData.id}>See tasks</button>
                    </li>`
                }).join('')}
            </ul>
        `

        // Content for tasks
        const $tasksContainer = document.getElementById("tasks_container")
        const $showUsrTasksBttns = document.querySelectorAll("button[name=showUserTasks]")
        $showUsrTasksBttns.forEach($showUsrTasksBttn => {
            $showUsrTasksBttn.addEventListener('click', async(e) => {
                // Fetching the info of the tasks for one user
                const usrData = usrsData.find(elem => elem.id === e.target.id)
                const negMsg = `No tasks could be retrieved for user ${usrData.name}`
                const userTasks = await fetchApi(`http://localhost:3000/users/${e.target.id}?_embed=tasks`, {}, negMsg)
                const $toggleButtn = document.getElementById("toggleButtn")
                $toggleButtn.removeAttribute("disabled")
                $toggleButtn.innerHTML = `${usrData.name}`
                if(userTasks.tasks.length){
                    // Displaying info in the DOM
                    $tasksContainer.innerHTML = `
                        <h4>${usrData.name} has these tasks assigned:</h4>
                        <ul id="tasksList">
                            ${userTasks.tasks.map(usrTask => {
                                return `<li>
                                    ${usrTask.title}
                                    <button name="showTaskPreview" id=${usrTask.id}>See task</button>
                                </li>`
                            }).join('')}
                        </ul>
                    `
                }else{
                    $tasksContainer.innerHTML = `<h4>${usrData.name} has no assigned tasks</h4>`
                }

                // Content for previsualization of tasks
                const $tasksList = document.getElementById("tasksList")
                if($tasksList){
                    // "<button name="showTaskPreview" id=${usrTask.id}>See task</button>"
                    const $modalBttns = document.querySelectorAll(`button[name=showTaskPreview]`)
                    $modalBttns.forEach($modalBttn => {
                        $modalBttn.addEventListener('click', (e)=>{
                            const userTask =  userTasks.tasks.find(elem => elem.id === e.target.id)
                            buildModal(userTask, usrData)
                        })
                    })
                }
            })
        })

        // When the user clicks anywhere outside of the modal, close it
        window.addEventListener('click', (e) =>{
            const modal = document.getElementById("myModal")
            if (e.target == modal) {
                modal.style.display = "none"
            }
        })
    }
    return {pageContent, logic}
}
