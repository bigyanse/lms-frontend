import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { UserProvider } from "./contexts/User";

import Header from "./components/Header";
import Home from "./pages/Home";
import Book from "./pages/Book";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Add from "./pages/Add";
import Edit from "./pages/Edit";
import NotFound from "./pages/NotFound";

const App = () => {
	return (
		<UserProvider>
			<Router>
				<div className="px-[100px] py-2">
					<Header />
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/book/:id" element={<Book />} />
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
						<Route path="/add" element={<Add />} />
						<Route path="/book/edit/:id" element={<Edit />} />
						<Route path="*" element={<NotFound />} />
					</Routes>
					<footer></footer>
				</div>
			</Router>
		</UserProvider>
	);
};

export default App;
