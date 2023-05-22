import { useState } from "react";

const BACKEND_BASE_URL = "https://lms-backend-v2qw.onrender.com";

const BookMenu = ({ book }: { book: any }) => {
	const [show, setShow] = useState(false);

	const toggleShow = () => {
		setShow(show => !show);
	};

  const handleEditClick = () => {
		window.location.href = `/book/edit/${book.id}`;
  };

	const handleDeleteClick = async () => {
		const response = await fetch(`${BACKEND_BASE_URL}/books/book/${book.id}/delete`, {
			method: "DELETE"
		});
		const data = await response.json();
		if(data.success) {
			window.location.href = "/";
		}
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative inline-block text-left">
        <div>
          <button
            type="button"
            className="inline-flex justify-center items-center p-2 text-gray-600 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            id="hamburger-menu"
            aria-expanded="false"
            aria-haspopup="true"
						onClick={toggleShow}
          >
            <span className="sr-only">Open menu</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        {show && <div className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="hamburger-menu">
          <div className="py-1" role="none">
            <button
              className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100"
              role="menuitem"
              onClick={handleEditClick}
            >
              Edit
            </button>
            <button
              className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100"
              role="menuitem"
              onClick={handleDeleteClick}
            >
              Delete
            </button>
          </div>
        </div>}
      </div>
    </div>
  );
};

export default BookMenu;
