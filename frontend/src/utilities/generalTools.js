export const calculateAge = (bornDate) => {
    let actualDate = new Date(), age;
    bornDate = new Date(bornDate);
    if (actualDate.getMonth() >= bornDate.getMonth()) {
        if (actualDate.getDate() >= bornDate.getDate()) {
            age = actualDate.getFullYear() - bornDate.getFullYear();
        } else {
            age = actualDate.getFullYear() - bornDate.getFullYear() - 1;
        }
    } else {
        age = actualDate.getFullYear() - bornDate.getFullYear() - 1;
    }
    return age;
}

export const sortCommentsProfileByDate = (reviews, id=-1) => {
    // Puede ser optimizado
    let newReviews = [...reviews];
    let userComment, flag = false;
    if(id!==-1){
        for(let i = 0; i<newReviews.length; i++){
            if(newReviews[i] && newReviews[i].idUser === id){
                userComment=newReviews[i];
                flag=true;
                newReviews.splice(i,1);
                break;
            }
        }
    }

    newReviews.sort((a, b)=> new Date(b['date']) - new Date(a['date']) );
    if(flag){
        newReviews.unshift(userComment);
    }
    

    return newReviews;
}

export const findUserInReviews = (reviews, id) => {
    let flag = false, newReviews = [...reviews];
    for(let i = 0; i<newReviews.length; i++){
        if(newReviews[i] && newReviews[i].idUser===id){
            flag = true;
            break;
        }
    }
    
    return flag;
}