export const fieldsFilled = (auth) => {
    let inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.value = auth.user[input.name];
    })
        
    let textarea = document.querySelector('textarea');
    if(textarea){
        textarea.value=auth.user[textarea.name];
    }
}