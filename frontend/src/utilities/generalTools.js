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