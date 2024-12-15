import React, { useState } from 'react';
import { IArticle } from './Article';
import { useNavigate } from 'react-router-dom';

export default function AddArticle(): JSX.Element {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate(); 
  document.title = 'Dodaj artykuł';
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title === '' || content === '') return;
    const articles = JSON.parse(localStorage.getItem('articles') || '[]') as IArticle[];
    const newArticle: IArticle = {
      id: articles.length > 0 ? Math.max(...articles.map(article => article.id)) + 1 : 1,
      title,
      content,
    };
    articles.push(newArticle);
    localStorage.setItem('articles', JSON.stringify(articles));
    navigate('/blog');
  };

  return (
    <div className='container'>
      <h1>Dodaj nowy artykuł</h1>
      <form onSubmit={handleSubmit}>
        <div className='formGroup'>
          <label htmlFor="title">Tytuł:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className='formGroup'>
          <label htmlFor="content">Treść:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={title === '' || content === ''}>Dodaj artykuł</button>
      </form>
    </div>
  );
};