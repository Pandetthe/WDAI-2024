import { Link } from 'react-router-dom';
import { IArticle } from './Article';

export default function Blog(): JSX.Element {
  const articles = JSON.parse(localStorage.getItem('articles') || '[]') as IArticle[];
  document.title = 'Blog';
  return (
    <div>
      <h1>Artykuły</h1>
      <ul className='articlesContainer'>
        {articles.map(article => (
          <li key={article.id}>
            <Link to={`/artykul/${article.id}`}>{article.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};