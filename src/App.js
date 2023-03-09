import { useState, useEffect } from 'react'
import BookCreate from './components/BookCreate'
import BookList from './components/BookList'
import axios from 'axios'
const App = () => {
	const [books, setBooks] = useState([])

	const fetchBooks = async () => {
		const response = await axios.get('http://localhost:3001/books')
		setBooks(response.data)
	}

	useEffect(() => {
		fetchBooks()
	}, [])

	const createBook = async title => {
		const response = await axios.post('http://localhost:3001/books', {
			title,
		})
		console.log(response)
		const updatedBook = [...books, response.data]
		setBooks(updatedBook)
	}

	const deleteBookById = async id => {
		await axios.delete(`http://localhost:3001/books/${id}`)
		const updatedBook = books.filter(book => book.id !== id)
		setBooks(updatedBook)
	}

	const editBookById = async (id, newTitle) => {
		const response = await axios.put(`http://localhost:3001/books/${id}`, {
			title: newTitle,
		})
		const updatedBook = books.map(book => {
			if (book.id === id) {
				return { ...book, ...response.data }
			}
			return book
		})

		setBooks(updatedBook)
	}

	return (
		<div className="app">
			<h1>Reading List</h1>
			<BookList onEdit={editBookById} books={books} onDelete={deleteBookById} />
			<BookCreate onCreate={createBook} />
		</div>
	)
}

export default App
