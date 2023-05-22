import { useState, FormEvent } from "react";

const Register = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();

		if(!email && !password) {
			setError("Please enter all the details!");
			return;
		}

		if(password.length <= 6) {
			setError("Passsword must be greater than 6 characters!");
			return;
		}

		const response = await fetch("http://localhost:5000/auth/register", {
			method: "POST",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify({ email, password }),
		});
		const data = await response.json();
		if(data.success) {
			window.location.href = "/login";
		} else {
			setError(data.error);
		}
	};

	return (
		<main>
			<div className="flex mt-[100px] items-center flex-col">
				<h2 className="text-xl text-center mb-5">Register</h2>
				{error && <p className="text-red-500">{error}</p>}
				<form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
							Email
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="email"
							type="email"
							placeholder="Enter your email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</div>
					<div className="mb-6">
						<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
							Password
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
							id="password"
							type="password"
							placeholder="Enter your password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>
					<div className="flex items-center justify-between">
						<button
							className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
							type="submit"
						>
							Register
						</button>
					</div>
				</form>
			</div>
		</main>
	);
};

export default Register;
