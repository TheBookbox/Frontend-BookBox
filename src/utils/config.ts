import { Methods, User } from "./interfaces"

export const api = process.env.NEXT_PUBLIC_API_URL

export const requestConfig = (method:Methods, data: any, token: string | null = null ) => {
    
    let config: { method: Methods; headers: { 'Content-Type'?: string; Authorization?: string }; body?: string }

    if(method === 'DELETE' || data === null){
        config = {
            method,
            headers: {}
        }
    }else{
        config = {
            method,
            body: JSON.stringify(data),
            headers: {
                'Content-Type':'application/json'
            }
        }
    }


    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
}


