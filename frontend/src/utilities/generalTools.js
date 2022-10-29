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

    let userComment;
    if(id!==-1){
        for(let i = 0; i<reviews.length; i++){
            if(reviews[i].idUser === id){
                userComment=reviews[i];
                if(i===0){
                    reviews.splice(0,1);
                }else{
                    reviews.splice(i);
                }
                break;
            }
        }
    }

    reviews.sort((a, b)=> new Date(a['date']) - new Date(b['date']));
    reviews.unshift(userComment);

    return reviews;
}

export const findUserInReviews = (reviews, id) => {
    let flag = false;
    for(let i = 0; i<reviews.length; i++){
        if(reviews[i].idUser===id){
            flag = true;
            break;
        }
    }
    
    return flag;
}