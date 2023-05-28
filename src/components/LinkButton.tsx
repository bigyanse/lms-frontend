import { ReactNode } from "react";
import { Link } from "react-router-dom";

const LinkButton = ({ href, children }: { href: string, children: ReactNode }) => {
	return (
		<Link className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" to={href}>
			{children}
		</Link>
	);
};

export default LinkButton;
