import Link from "./Link";

const BookCard = ({ book } : { book: any }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <div className="flex justify-center">
        <img src={book.image} alt={`${book.title} by ${book.author}`} className="h-48 w-32 object-cover" />
      </div>
      <div className="flex justify-between items-center mt-4">
				<div>
					<h3 className="text-lg font-semibold">{book.title}</h3>
					<p className="text-gray-500">{book.author}</p>
				</div>
				<div>
					<Link href={`/book/${book.id}`}>Info</Link>
				</div>
      </div>
    </div>
  );
};

export default BookCard;
