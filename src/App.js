import { useState } from 'react'
import BookCreate from './components/BookCreate'
import BookList from './components/BookList'
const App = () => {
	const [books, setBooks] = useState([])

	const createBook = title => {
		const updatedBook = [
			...books,
			{
				id: Math.floor(Math.random() * 1000),
				title,
			},
		]
		setBooks(updatedBook)
		console.log(books)
	}

	const deleteBookById = id => {
		const updatedBook = books.filter(book => book.id !== id)
		setBooks(updatedBook)
	}

	const editBookById = (id, newTitle) => {
		const updatedBook = books.map(book => {
			if (book.id === id) {
				return { ...book, title: newTitle }
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
