import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import BookCard from "../components/BookCard";

const BACKEND_BASE_URL = "https://lms-backend-v2qw.onrender.com";

const Search = () => {
	const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const query = queryParams.get('q');

	const [books, setBooks] = useState([]);
	const [error, setError] = useState("");

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch(`${BACKEND_BASE_URL}/books/search?q=${query}`);
			const data = await response.json();
			if(data.success) {
				setBooks(data.data.books);
			} else {
				setError("Error fetching books!");
			}
		};

		fetchData();
	}, []);



	return (
		<main>
			<section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 py-5">
				<h2 className="text-xl">You searched for '{query}'</h2>
				<div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{books.length !== 0 && books.map((book, key) => {
						return <BookCard key={key} book={book} />;
					})}
					{error && <>{error}</>}
					{!books.length && <>No books in collection</>}
				</div>
			</section>
		</main>
	);
};

export default Search;
