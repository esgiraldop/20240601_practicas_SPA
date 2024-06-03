import { notFoundScene } from "../scenes/public/notFound/notFound.scene";
import { loginScene } from "../scenes/public/login";
import { registerScene } from "../scenes/public/register/register.scene";
import { tasksScene } from "../scenes/private/tasks/tasks.scene";
import { usersScene } from "../scenes/private/users/users.scene";
import { editTaskScene } from "../scenes/private/editTask";

export const routes = {
    public: [
        //{path: '/dir', scene: dirFunc}
        {path: '/login', scene: loginScene},
        {path: '/notFound', scene: notFoundScene},
        {path: '/register', scene: registerScene}
    ],
    private: [
        {path: '/tasks', scene: tasksScene},
        {path: '/users', scene: usersScene},
        {path: '/tasks/editTask', scene: editTaskScene}
    ]
}