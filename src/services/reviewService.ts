import { requestConfig, api } from "@/utils/config";
import { ReviewEdit } from "@/utils/interfaces";

const getAllReviews = async(token: string) => {
    const config = requestConfig('GET', null, token)

    try {
        const res = await fetch(api + '/review', config)
        .then(res => res.json())
        .catch(err => err)

        return res


    } catch (error) {
        console.error(error);
        
    }
}

const likeReview = async(id: string, token: string ) => {
    const config = requestConfig('PUT', null, token)

    try {

        const res = await fetch(api + '/review/books/like/'+id, config)
        .then(res => res.json())
        .catch(e => e)

        return res

    } catch (error) {
        console.error(error);
        
    }
}

const getUserReviews = async(userId: string, token: string) => {
    const config = requestConfig('GET', null, token)

    try {
        const res = await fetch(api + '/review/books/'+ userId, config)
        .then(res => res.json())
        .catch(e => e)

        return res


    } catch (error) {
        console.error(error);
        
    }
}

const deleteReview = async(id: string, token: string) => {
    const config = requestConfig('DELETE', null, token)
    
    try {
        const res = await fetch(api + '/review/' + id, config)
        .then(res => res.json())
        .catch(err => err)

        return res


    } catch (error) {
        console.error(error);
        
    }

}

const editReview = async(data:ReviewEdit, id: string,  token: string) => {
    const config = requestConfig('PUT', data, token)

    try {
        const res = await fetch(api + '/review/books/' + id, config)
        .then(res => res.json())
        .catch(err => err)

        return res


    } catch (error) {
        console.error(error);
        
    }
}

const getReviewById = async(id: string, token: string) => {
    const config = requestConfig('GET', null, token)

    try {
        const res = await fetch(api + '/review/' + id, config)
        .then(res => res.json())
        .catch(err => err)

        return res

    } catch (error) {
        console.error(error);
        
    }
}

const reviewService = {
    getAllReviews,
    likeReview,
    getUserReviews,
    getReviewById,
    deleteReview,
    editReview

}


export default reviewService