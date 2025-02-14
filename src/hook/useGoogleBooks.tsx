import { useEffect, useState } from "react";

interface Book {
    id: string;
    volumeInfo: {
      title: string;
      authors: string[];
      description?: string;
      imageLinks?: {
        thumbnail?: string;
      };
    };
  }

const API_BASE_URL = "https://www.googleapis.com/books/v1/volumes";

export const useGoogleBooks = (query: string, maxResults = 10) => {

    const[books, setBooks] = useState<Book[]>([])
    const[loading, setLoading] = useState(false)
    const[error, setError] = useState<string | null>(null)

    if(!query) return

    useEffect(() => {
    
        const fetchBooks = async () => {
          setLoading(true);
          setError(null);
    
          try {
            const response = await fetch(
              `${API_BASE_URL}?q=${query}&maxResults=${maxResults}`
            );

            
            const data = await response.json();

            if (data.items) {
                const filteredBooks = data.items.filter(
                    (book: any) => book.volumeInfo.maturityRating === "NOT_MATURE"
                  )

              setBooks(filteredBooks);
            } else {
              setBooks([]);
            }
          } catch (err) {
            setError("Erro ao buscar os livros.");
          } finally {
            setLoading(false);
          }
        };
    
        fetchBooks();
      }, [query, maxResults]);


      return {books, loading, error}

}

export const useBook = (id: string | string[] | undefined) => {
    const[loading, setLoading] = useState(false)
    const[book, setBook] = useState<any>([])
    const[error, setError] = useState<string | null>(null)

    if(!id){
      return
    }

    
    useEffect(()=>{
      setLoading(true);
      setError(null);

      const fetchBook = async() => {

        try {
          setLoading(true)
          setError(null)
    
        
          const res = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`)
          
          const response = await res.json()
    
          setBook([response])
    
    
        } catch (error) {
          setError(error instanceof Error ? error.message : "Erro desconhecido")
        } finally {
          setLoading(false)
        }


      }

      fetchBook()
    },[id])



    return {loading, book, error}

 

    
}