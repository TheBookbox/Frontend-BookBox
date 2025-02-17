export interface User{
    _id?: string | undefined
    name?:string | undefined
    email?: string | undefined
    password?: string | undefined
    followers?: [],
    following?: [],
}

interface Comment {
  userName: string;
  text: string;
}

export interface Review {
    bookId: string,
    stars: number,
    userId: string,
    text: string,
    bookName: string,
    thumbnail: string,
    likes: string[],
    comments: Comment[],
    userName: string,
    _id: string,
    createdAt: string,
    updatedAt: string
}


export type Methods = 'GET' | 'DELETE' | 'PUT' | 'POST'
