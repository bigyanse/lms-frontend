import { useContext } from "react";

import LinkButton from "./LinkButton";
import Button from "./Button";
import SearchBar from "./SearchBar";
import { UserContext } from "../contexts/User";

const BACKEND_BASE_URL = "https://lms-backend-v2qw.onrender.com";

const Header = () => {
	const user = useContext(UserContext);

	const logout = async () => {
		const response = await fetch(`${BACKEND_BASE_URL}/auth/logout`, { credentials: 'include', method: "POST" });
		const data = await response.json();
		if(data.success) window.location.href = "/";
	};

	return (
		<header className="py-2 flex justify-between border-b">
				<h1 className="text-2xl"><a href="/">LMS</a></h1>
				<SearchBar />
				<div className="flex gap-2">
					{!user && <><LinkButton href="/login">Login</LinkButton>
					<LinkButton href="/register">Register</LinkButton></>}
					{user && <LinkButton href="/add">Add</LinkButton>}
					{user && <Button onClick={logout}>Logout</Button>}
				</div>
			</header>
	);
};

export default Header;
