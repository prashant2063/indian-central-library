export interface Book {
    _id: string,
    title: string, 
    author: string,
    isAvailable: boolean,
    isbn: string,
    genres: string,
    pages: string,
    publisher: string,
    publishDate: string,
    coverImg: string,
    startDate?: string,
    endDate?: string
}
