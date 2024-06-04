import { dasboardScene } from "./scenes/private/dashboard/dashboard.scene";
import { loginScene } from "./scenes/public/login/login.scene";
import { notFoundScene } from "./scenes/public/not-found/not-found.scene";
import { registerScene } from "./scenes/public/register/register.scene";

export const routes = {
    public:[
        {path: "/login", scene: loginScene},
        {path: "/register", scene: registerScene},
        {path: "/notFound", scene: notFoundScene}
    ],
    private:[
        {path: "/dashboard", scene: dasboardScene}
    ]
}