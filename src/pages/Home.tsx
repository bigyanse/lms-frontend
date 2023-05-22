import { useState, useEffect } from "react";

import BookCard from "../components/BookCard";

const Home = () => {
	const [books, setBooks] = useState([]);
	const [error, setError] = useState("");

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch("http://localhost:5000/books");
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
				<h2 className="text-xl">Books Collection</h2>
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

export default Home;
