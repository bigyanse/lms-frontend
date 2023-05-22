import { useContext, ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { UserContext } from "../contexts/User";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
	const user = useContext(UserContext);

	return (
		<>
			{user && children}
			{!user && <Navigate to="/login" />}
		</>
	);
};

export default PrivateRoute;
