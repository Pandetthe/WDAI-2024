import { Outlet, Link } from "react-router-dom";

export default function Layout(): JSX.Element {
  return (
    <>
      <header>
        <h1>Lab4 Zadanie 8.2</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Strona główna</Link>
            </li>
            <li>
              <Link to="/blog">Blog</Link>
            </li>
            <li>
              <Link to="/dodaj">Dodaj artykuł</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  )
}
