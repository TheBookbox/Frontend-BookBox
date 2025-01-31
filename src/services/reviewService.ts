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



const reviewService = {
    getAllReviews,

}


export default reviewService