import { useState, useEffect, createContext, ReactNode } from "react";

interface User {
	email: string;
	admin: boolean;
};

export const UserContext = createContext<User | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		const fetchUser = async () => {
			const response = await fetch("http://localhost:5000/auth/me", { credentials: 'include' });
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
