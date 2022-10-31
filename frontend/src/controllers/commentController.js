import { deleteCommentListingAPI, setCommentListingAPI, updateCommentListingAPI } from "../api/listingAPI";
import { deleteReviewProfileAPI, setReviewProfileAPI, updateReviewProfileAPI } from "../api/userAPI";


export const createComment = async (auth, body, isProfile) => {
    let msg, comment, res;
    try {
        if (isProfile) {
            res = await setReviewProfileAPI(body);
        } else {
            res = await setCommentListingAPI(body);
        }

        comment = res.data.comment;
        msg = res.data.msg;
    } catch (err) {
        if (err.response.data.isNotLogged) {
            auth.logOut();
        }
        msg = err.response.data.error;
        console.log('Create comment error: ' + err.response.data.error);
    }

    return { msg, comment };
}

export const deleteComment = async (auth, body, isProfile) => {
    let msg, res;
    try {
        if (isProfile) {
            res = await deleteReviewProfileAPI(body);
        } else {
            res = await deleteCommentListingAPI(body);
        }

        msg = res.data.msg;
    } catch (err) {
        if (err.response.data.isNotLogged) {
            auth.logOut();
        }
        msg = err.response.data.error;
        console.log('Delete comment error: ' + err.response.data.error);
    }

    return msg;
}

export const updateComment = async (auth, body, isProfile) => {
    let msg, res;
    try {

        if (isProfile) {
            res = await updateReviewProfileAPI(body);
        } else {
            res = await updateCommentListingAPI(body);
        }
        msg = res.data.msg;
    } catch (err) {
        if (err.response.data.isNotLogged) {
            auth.logOut();
        }
        msg = err.response.data.error;
        console.log('Update comment error: ' + err.response.data.error);
    }

    return msg;
} 