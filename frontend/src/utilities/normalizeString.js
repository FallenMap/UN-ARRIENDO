export function normalize(str){
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export function capitalize(str){
    let cadenas = str.split(" ");
    let result = "";
    for(let i=0; i<cadenas.length; i++){
        result+=cadenas[i].toLowerCase().charAt(0).toUpperCase()+cadenas[i].toLowerCase().slice(1)+" ";
    }
    return result.trimEnd();
}