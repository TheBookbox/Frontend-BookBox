import { api, requestConfig } from "@/utils/config";


const profile = async(token: string) => {
    const config = requestConfig('GET', null, token)

    try {
        const res = await fetch(api + '/users/profile', config)
        .then(res => res.json())
        .catch(err => err)

        return res


    } catch (error) {
        console.error(error);
        
    }
}

const getUserById = async(id: string, token: string) => {
    const config = requestConfig('GET', null, token)

    try {
        const res = await fetch(api + '/users/profile/'+id, config)
        .then(res => res.json())
        .catch(err => err)

        return res

    } catch (error) {
        console.error(error);
        
    }
}


const followSomeone = async(id: string, token: string) => {
    const config = requestConfig('PUT', null, token)

    try {
        const res = await fetch(api + '/users/follow/' + id, config)
        .then(res => res.json())
        .catch(e => e)

        return res

    } catch (error) {
        console.log(error);
        
    }
}


const userService = {
    profile,
    getUserById,
    followSomeone

}



export default userService