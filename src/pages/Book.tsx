import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import BookMenu from "../components/BookMenu";
import BookCard from "../components/BookCard";

const BACKEND_BASE_URL = "https://lms-backend-v2qw.onrender.com";

interface IBook {
	title: string;
	description: string;
	image: string;
	author: string;
	genre: string;
};

const Book = () => {
	const { id } = useParams();

	const [book, setBook] = useState<IBook | null>(null);
	const [recommendations, setRecommendations] = useState([]);
	const [error, setError] = useState("");

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch(`${BACKEND_BASE_URL}/books/book/${id}`);
			const recommendationResponse = await fetch(`${BACKEND_BASE_URL}/books/recommend?book=${id}`);
			const data = await response.json();
			const recommendationData = await recommendationResponse.json();
			if(data.success) {
				setBook(data.data.book);
				setRecommendations(recommendationData.data.books);
				document.title = `${data.data.book.title} - LMS`;
			} else {
				setError("Error fetching book!");
			}
		};

		fetchData();
	}, []);


	return (
		<main>
			{book &&
			<>
				<div className="container mx-auto mt-8">
					<div className="inline-block float-right"><BookMenu book={book} /></div>
					<div className="bg-white shadow-md rounded-lg p-4">
						<div className="flex justify-center">
							<img src={book.image} className="h-48 w-32 object-cover" />
						</div>
						<div className="mt-4">
							<h2 className="text-2xl font-semibold mb-2">{book.title}</h2>
							<p className="text-gray-500">Author: {book.author}</p>
							<p className="text-gray-500">Genre: {book.genre}</p>
							<p className="text-gray-500">Description: {book.description}</p>
						</div>
					</div>
				</div>
				<section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 py-5">
					<h2 className="text-xl">Recommended</h2>
					<div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{recommendations.length !== 0 && recommendations.map((book, key) => {
							return <BookCard key={key} book={book} />;
						})}
						{!recommendations.length && <>Nothing much to recommend!</>}
					</div>
				</section>
			</>}
			{!book && <>Not Found</>}
			{error && <>Something went wrong!</>}
		</main>
  );
};

export default Book;
