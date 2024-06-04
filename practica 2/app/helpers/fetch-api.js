export async function fetchApi(url, config, negMsg, posMsg){
    try{
        const response = await fetch(url, config)
        if(!response.ok){
            negMsg ? alert(negMsg):""
            return ""
        }
        posMsg ? alert(posMsg):""
        const data = await response.json()
        return data
    }catch(error){
        alert("There was an error connecting to the database")
    }
}