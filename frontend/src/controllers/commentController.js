import { deleteReviewProfileAPI, setReviewProfileAPI, updateReviewProfileAPI } from "../api/userAPI";


export const createComment = async (auth, body) => {
    let msg, comment;
    try{
       let res = await setReviewProfileAPI(body);
       comment = res.data.comment; 
       msg = res.data.msg;
    }catch(err){
        if(err.response.data.isNotLogged){
            auth.logOut();
        }
        msg = err.response.data.error;
        console.log('Create comment error: '+err.response.data.error);
    }
    
    return {msg, comment};
} 

export const deleteComment = async (auth, body) => {
    let msg;
    try{
       let res = await deleteReviewProfileAPI(body);
       msg = res.data.msg;
    }catch(err){
        if(err.response.data.isNotLogged){
            auth.logOut();
        }
        msg = err.response.data.error;
        console.log('Delete comment error: '+err.response.data.error);
    }
    
    return msg;
} 

export const updateComment = async (auth, body) => {
    let msg;
    try{
       let res = await updateReviewProfileAPI(body);
       msg = res.data.msg;
    }catch(err){
        if(err.response.data.isNotLogged){
            auth.logOut();
        }
        msg = err.response.data.error;
        console.log('Update comment error: '+err.response.data.error);
    }
    
    return msg;
} 