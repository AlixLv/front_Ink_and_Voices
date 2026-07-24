import { useParams } from 'react-router-dom';
import DetailedBookCard from "../../components/DetailedBookCard/DetailedBookCard";

export default function BookDetailPage() {
  const { id } = useParams<{ id: string }>();
  const bookId = Number(id);

  if (!id || Number.isNaN(bookId)) {
    return <p>Identifiant de livre invalide</p>;
  }

  return <DetailedBookCard id={bookId} />;
}