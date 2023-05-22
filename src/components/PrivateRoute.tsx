import { useContext, ReactNode } from "react";

import { UserContext } from "../contexts/User";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
	const user = useContext(UserContext);

	if(user) {
		return (
			<>{children}</>
		);
	} else {
		window.location.href = "/login";
	}
};

export default PrivateRoute;
