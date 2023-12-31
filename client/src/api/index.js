import axios from 'axios';
const url = process.env.REACT_APP_EJS_SERVER_ADDRESS;
const API = axios.create({ baseURL: url });
API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req;
})

//Dealing with the post/shloka
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);

export const fetchPostById = (id) => API.get(`/posts/${id}`);

export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || ''}&tags=${searchQuery.tags || ''}&chapterNumber=${searchQuery.chapterNumber || ''}&bookId=${searchQuery?.bookId || ''}`);

export const createPost = (newPost) => API.post('/posts', newPost);

export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);

export const deletePost = (id) => API.delete(`/posts/${id}`);

export const likePost = (id) => API.patch(`/posts/like/${id}`);

export const commentOnPost = (comment, id) => API.post(`/posts/commentOnPost/${id}`, { comment });


//Dealing with Auth module
export const signIn = (formData) => API.post('/user/signin', formData);

export const signUp = (formData) => API.post('/user/signup', formData);


// Dealing with the Chapters of a specific Book
export const fetchBookChapters = (bookId) => API.get(`/book-chapters?bookId=${bookId}`);

export const createChapter = (newChapter) => API.post(`/book-chapters/create`, newChapter);


// Dealing with all the Books
export const fetchBooks = () => API.get('/books');

export const createBook = (newBook) => API.post('/books/create', newBook);

export const fetchBooksBySearch = (searchQuery) => API.get(`/books/search?bookId=${searchQuery?.bookId || ''}`);