const persona = {
    nombre : "gus",
    edad: 33,
    
}

const json = JSON.stringify(persona, (key,value) => {
    if(key === "nombre") return ""
    return value
})

console.log(json)