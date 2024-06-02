import { Router } from "./Router"

export function App(){
    const root = document.getElementById("root")
    if(!root){
        throw new Error("An error occured when loading the webpage")
    }
    Router()
}