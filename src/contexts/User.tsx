import { useState, useEffect, createContext, ReactNode } from "react";

interface User {
	email: string;
	admin: boolean;
};

const BACKEND_BASE_URL = "https://lms-backend-v2qw.onrender.com";

export const UserContext = createContext<User | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		const fetchUser = async () => {
			const response = await fetch(`${BACKEND_BASE_URL}/auth/me`, { credentials: 'include' });
			const data = await response.json();
			if(data.success) {
				setUser(data.data.user);
			}
		};

		fetchUser();
	}, []);

	return (
		<UserContext.Provider value={user}>
			{children}
		</UserContext.Provider>
	);
};
