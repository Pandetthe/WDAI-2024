import './App.css'
import Formularz from './components/formularze/Formularz'
import Haslo from './components/formularze/Haslo'
import Logowanie from './components/formularze/Logowanie'
import Aktualizacja from './components/inne/Aktualizacja'
import Ternary from './components/inne/Ternary'
import Koszyk from './components/koszyk/Koszyk'
import NowyKoszyk from './components/koszyk/NowyKoszyk'
import Licznik from './components/liczniki/Licznik'
import NowyLicznik from './components/liczniki/NowyLicznik'
import LicznikEfekty from './components/efekty/Licznik'
import Tytul from './components/efekty/Tytul'
import Odliczanie from './components/efekty/Odliczanie'
import Komentarz from './components/produkty/Komentarz'
import { User } from './components/produkty/Komentarz'
import Komentarze from './components/produkty/Komentarze'
const user: User = {
  id: 1,
  fullName: 'John Doe',
  username: 'johndoe'
};

function App() {
  return (
    <>
      <h1>Koszyki</h1>
      <Koszyk />
      <NowyKoszyk />
      <h1>Liczniki</h1>
      <Licznik />
      <NowyLicznik />
      <h1>Formularze</h1>
      <h2>Formularz</h2>
      <Formularz />
      <h2>Hasło</h2>
      <Haslo />
      <h2>Logowanie</h2>
      <Logowanie />
      <h1>Inne</h1>
      <h2>Ternary</h2>
      <Ternary />
      <h2>Aktualizacja</h2>
      <Aktualizacja />
      <h1>Efekty</h1>
      <LicznikEfekty />
      <Tytul />
      <Odliczanie />
      <h1>Produkty</h1>
      <h2>Komentarz</h2>
      <Komentarz likes={10} user={user} body='Example comment' id={1} postId={1} />
      <h2>Komentarze</h2>
      <Komentarze />
    </>
  )
}

export default App
