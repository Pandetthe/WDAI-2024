import { useParams } from "react-router"

export interface IArticle {
  id: number;
  title: string;
  content: string;
}

export default function Article(): JSX.Element {
  const params = useParams();
  const id = parseInt(params.id ?? '', 10);
  const articles = JSON.parse(localStorage.getItem('articles') || '[]') as IArticle[];
  const article = articles.find(article => article.id === id);
  if (!article) {
    document.title = 'Nie znaleziono';
    return <div>Nie znaleziono artykułu</div>;
  }
  document.title = article.title;
  return (
    <div className="container">
      <h1>{article.title}</h1>
      <p>{article.content}</p>
    </div>
  );
};