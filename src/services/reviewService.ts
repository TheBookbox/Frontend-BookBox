import { requestConfig, api } from "@/utils/config";

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

const reviewService = {
    getAllReviews,
    likeReview,
    getUserReviews

}


export default reviewService