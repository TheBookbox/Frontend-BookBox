import { requestConfig, api } from "@/utils/config";
import { User } from "@/utils/interfaces";
import Cookies from "js-cookie";


// register user

const register = async(data: User) => {
    const config = requestConfig('POST', data)

    try {
        const res = await fetch(api + '/users/register', config)
        .then(res => res.json())
        .catch(err => err)

        console.log(res);
        

        if(!res.erro){
            Cookies.set('user', JSON.stringify(res), {expires: 7})
        }

        return res;

        
    } catch (error) {
        console.log(error);
        
    }
}

// login

const login = async(data: User) => {
    const config = requestConfig('POST', data)

    try {
        const res = await fetch(api + '/users/login', config)
        .then(res => res.json())
        .catch(err => err)

        if(res){
            if(res.erro){
                return res;
            }
            
            Cookies.set('user', JSON.stringify(res), {expires: 7})
        }

        return res;

    } catch (error) {
        console.error(error);
        
    }
}

// logout

const logout = async() => {
    Cookies.remove('user')
}

const authService = {
    register,
    login,
    logout
}

export default authService