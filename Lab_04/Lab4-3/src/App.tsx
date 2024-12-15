import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Layout from './pages/Layout';
import Home from './pages/Home';
import Article from './pages/Article';
import Blog from './pages/Blog';
import AddArticle from './pages/AddArticle';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/artykul/:id" element={<Article />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/dodaj" element={<AddArticle />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
