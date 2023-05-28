import { useState } from "react";

import LinkButton from "./LinkButton";

const SearchBar = () => {
	const [query, setQuery] = useState("");

	return (
		<div className="flex items-center">
			<input
				type="text"
				placeholder="Search"
				value={query}
				className="border border-gray-300 rounded-l-lg px-4 py-2 w-[400px] focus:outline-none focus:ring focus:border-blue-500"
				onChange={(e) => setQuery(e.target.value)}
			/>
			<LinkButton href={`/search?q=${query}`}>
				Search
			</LinkButton>
		</div>
	);
};

export default SearchBar;
