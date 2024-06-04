import { decryptData, encryptData } from "../encrypt";

document.addEventListener('DOMContentLoaded', () =>{
    document.write("Hola mundo")
    const pass = encryptData("pass")
    console.log("pass: ", pass)
})