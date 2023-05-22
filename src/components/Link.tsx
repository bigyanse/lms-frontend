import { ReactNode } from "react";

const Link = ({ href, children }: { href: string, children: ReactNode }) => {
	return (
		<a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" href={href}>
			{children}
		</a>
	);
};

export default Link;
