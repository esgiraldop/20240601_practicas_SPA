import { adminScene } from "../scenes/private/admin/admin.scene";
import { dashboardScene } from "../scenes/private/visitor/dashboard/dashboard.scene";
import { loginScene } from "../scenes/public/login/login.scene";
import { notFoundScene } from "../scenes/public/not-found/not-found.scene";
import { registerScene } from "../scenes/public/register/register.scene";

export const routes = {
    public:[
        {path: "/login", scene: loginScene},
        {path: "/register", scene: registerScene},
        {path: "/notFound", scene: notFoundScene}
    ],
    private:[
        {path: "/dashboard", scene: dashboardScene, roles: ["1", "2"]},
        {path: "/dashboard/admin", scene: adminScene, roles: ["2"]}
    ]
}