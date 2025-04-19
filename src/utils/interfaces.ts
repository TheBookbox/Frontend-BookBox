export interface User{
    _id?: string | undefined
    name?:string | undefined
    email?: string | undefined
    password?: string | undefined
    followers?: [],
    following?: [],
}

export interface Comments {
  idReview: string;
  userName: string;
  userId: string;
  text: string;
  date: string;
}

export interface CommentData {
  idReview: string | null
  text: string
}

export interface ReviewInsert {
  bookId: string,
  stars: number,
  text: string,
}

export interface Review {
    bookId: string,
    stars: number,
    userId: string,
    text: string,
    bookName: string,
    thumbnail: string,
    likes: string[],
    comments: Comments[],
    userName: string,
    _id: string,
    createdAt: string,
    updatedAt: string
}


export interface ReviewEdit {
  _id: string | undefined;
  text: string | undefined;
  stars: number | undefined;
}

export type Methods = 'GET' | 'DELETE' | 'PUT' | 'POST'
