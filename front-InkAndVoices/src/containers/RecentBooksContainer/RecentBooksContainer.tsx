import BooksList from "../../components/BookList/BooksList";
import './RecentBooksContainer.css';

export default function RecentBooksContainer() {
    return (
        <div>
            <h1 className="recent-books-title">Ajoutés récemment</h1>
            <BooksList />
        </div>
    )
}