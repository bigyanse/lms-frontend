import { useState, FormEvent, useEffect } from "react";
import { useParams } from "react-router-dom";

const Edit = () => {
	const { id } = useParams();

	const [error, setError] = useState("");

	const [title, setTitle] = useState("");
	const [image, setImage] = useState("");
	const [description, setDescription] = useState("");
	const [author, setAuthor] = useState("");
	const [genre, setGenre] = useState("");

	const [message, setMessage] = useState({ type: "", content: "" });

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();

		const response = await fetch(`http://localhost:5000/books/book/${id}/edit`, {
			method: "PUT",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify({ title, description, image, author, genre }),
		});
		const data = await response.json();
		if(data.success) {
			setMessage({ type: "success", content: "Book Edited!" });
		} else {
			setMessage({ type: "error", content: "Error editing book!" });
		}

		setTitle("");
		setDescription("");
		setImage("");
		setAuthor("");
		setGenre("");
	};

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch(`http://localhost:5000/books/book/${id}`);
			const data = await response.json();
			if(data.success) {
				setTitle(data.data.book.title);
				setDescription(data.data.book.description);
				setImage(data.data.book.image);
				setAuthor(data.data.book.author);
				setGenre(data.data.book.genre);
			} else {
				setError("Error fetching book!");
			}
		};

		fetchData();
	}, [message, error]);

	return (
		<main>
			{error && <>Error updating details!</>}
			{title && description && image && genre && author && <>
			<h2 className="text-xl mt-2">Edit Book</h2>
			<div className="max-w-md mx-auto mt-6">
				<p className="text-center">{message.content && <span className={message.type === "error" ? "text-red" : "text-green"}>{message.content}</span>}</p>
				<form onSubmit={handleSubmit} className="space-y-6">
					<div>
						<label htmlFor="title" className="block font-medium text-gray-700">Title</label>
						<input
							type="text"
							id="title"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							className="mt-1 block w-full h-[30px] border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
							required
						/>
					</div>

					<div>
						<label htmlFor="description" className="block font-medium text-gray-700">Description</label>
						<textarea
							id="description"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
							required
						></textarea>
					</div>

					<div>
						<label htmlFor="image" className="block font-medium text-gray-700">Image URL</label>
						<input
							type="text"
							id="image"
							value={image}
							onChange={(e) => setImage(e.target.value)}
							className="mt-1 block w-full h-[30px] border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
							required
						/>
					</div>

					<div>
						<label htmlFor="author" className="block font-medium text-gray-700">Author</label>
						<input
							type="text"
							id="author"
							value={author}
							onChange={(e) => setAuthor(e.target.value)}
							className="mt-1 block w-full h-[30px] border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
							required
						/>
					</div>

					<div>
						<label htmlFor="genre" className="block font-medium text-gray-700">Genre</label>
						<input
							type="text"
							id="genre"
							value={genre}
							onChange={(e) => setGenre(e.target.value)}
							className="mt-1 block w-full h-[30px] rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
							required
						/>
					</div>

					<div>
						<button
							type="submit"
							className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							Save
						</button>
        	</div>
				</form>
			</div></>}
			{!(title && description && image && genre && author)  && <>Not Found</>}
		</main>
	);
};

export default Edit;
