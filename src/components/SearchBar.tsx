import { useState } from "react";

const SearchBar = () => {
	const [query, setQuery] = useState("");

	const handleSearch = () => {
		if(query) {
			window.location.href = `/search?q=${query}`;
		}
	};

	return (
		<div className="flex items-center">
			<input
				type="text"
				placeholder="Search"
				value={query}
				className="border border-gray-300 rounded-l-lg px-4 py-2 w-[400px] focus:outline-none focus:ring focus:border-blue-500"
				onChange={(e) => setQuery(e.target.value)}
			/>
			<button
				type="button"
				className="bg-blue-500 hover:bg-blue-600 text-white rounded-r-lg px-4 py-2 focus:outline-none"
				onClick={handleSearch}
			>
				Search
			</button>
		</div>
	);
};

export default SearchBar;
