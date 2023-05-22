import { useContext, ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { UserContext } from "../contexts/User";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
	const user = useContext(UserContext);

	if(user) {
		return (
			<>{children}</>
		);
	} else {
		<Navigate to="/login" />
	}
};

export default PrivateRoute;
