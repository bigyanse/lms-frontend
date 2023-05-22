import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import BookMenu from "../components/BookMenu";

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

	const [book, setBook] = useState<IBook | {}>({});
	const [error, setError] = useState("");

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch(`${BACKEND_BASE_URL}/books/book/${id}`);
			const data = await response.json();
			if(data.success) {
				setBook(data.data.book);
			} else {
				setError("Error fetching book!");
			}
		};

		fetchData();
	}, []);


	return (
		<main>
			{book &&
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
			</div>}
			{!book && <>Not Found</>}
		</main>
  );
};

export default Book;
