import { useContext } from "react";

import Link from "./Link";
import Button from "./Button";
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
				<div className="flex items-center">
					<input
						type="text"
						placeholder="Search"
						className="border border-gray-300 rounded-l-lg px-4 py-2 w-[400px] focus:outline-none focus:ring focus:border-blue-500"
					/>
					<button
						type="button"
						className="bg-blue-500 hover:bg-blue-600 text-white rounded-r-lg px-4 py-2 focus:outline-none"
					>
						Search
					</button>
				</div>
				<div className="flex gap-2">
					{!user && <><Link href="/login">Login</Link>
					<Link href="/register">Register</Link></>}
					{user && <Link href="/add">Add</Link>}
					{user && <Button onClick={logout}>Logout</Button>}
				</div>
			</header>
	);
};

export default Header;
