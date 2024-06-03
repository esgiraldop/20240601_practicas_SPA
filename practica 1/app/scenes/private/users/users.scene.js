import { fetchApi } from '../../../helpers/fetch-api'
import styles from './users.styles.css'

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
            <div class="${styles.tasks_element}" id="tasks_container">
                <!--Insert the tasks associated to each user here-->
                <p>Select any of the users at the left to display a list of tasks</p>
            </div>
        </div>
       </div>
    `
    const logic = async () =>{
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
                }
                ).join('')}
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
                console.log("userTasks: ", userTasks.tasks)
                if(userTasks.tasks.length){
                    // Displaying info in the DOM
                    $tasksContainer.innerHTML = `
                        <h4>${usrData.name} has these tasks assigned:</h4>
                        <ul>
                            ${userTasks.tasks.map(usrTask => {
                                return `<li>
                                    ${usrTask.title}
                                    <button name="showUserTasks" id=${usrTask.id}>See tasks</button>
                                </li>`
                            }
                            ).join('')}
                        </ul>
                    `
                }else{
                    $tasksContainer.innerHTML = `<h4>${usrData.name} has no assigned tasks</h4>`
                }
            })
        })
    }
    return {pageContent, logic}
}