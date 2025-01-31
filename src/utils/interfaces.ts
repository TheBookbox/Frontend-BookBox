export interface User{
    _id?: string | undefined
    name?:string | undefined
    email?: string | undefined
    password?: string | undefined
}


export interface Review {
    stars: number,
    userId: string,
    text: string,
    bookName: string,
    thumbnail: string,
    likes: string[],
    comments: string[],
    userName: string,
    _id: string,
    createdAt: string,
    updatedAt: string
}


export type Methods = 'GET' | 'DELETE' | 'PUT' | 'POST'