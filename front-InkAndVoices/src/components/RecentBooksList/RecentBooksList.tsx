import BooksList from "../BookList/BooksList";
import './RecentBooksList.css';

export default function RecentBooksList() {
    return (
        <div>
            <h1 className="recent-books-title">Ajoutés récemment</h1>
            <BooksList />
        </div>
    )
}