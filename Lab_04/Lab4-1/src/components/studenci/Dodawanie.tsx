import { useState } from "react";
import { Student } from "./Studenci";

interface DodawanieProps {
  onAddStudent: (student: Student) => void;
}

export default function Dodawanie({ onAddStudent }: DodawanieProps): JSX.Element {
  const [imie, setImie] = useState('');
  const [nazwisko, setNazwisko] = useState('');
  const [rocznik, setRocznik] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imie || !nazwisko || !rocznik || isNaN(Number(rocznik))) {
      alert('Wszystkie pola muszą być wypełnione i rocznik musi być liczbą.');
      return;
    }
    onAddStudent({ imie, nazwisko, rocznik: Number(rocznik) });
    setImie('');
    setNazwisko('');
    setRocznik('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Imię:
          <input type="text" value={imie} onChange={(e) => setImie(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Nazwisko:
          <input type="text" value={nazwisko} onChange={(e) => setNazwisko(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Rocznik:
          <input type="text" value={rocznik} onChange={(e) => setRocznik(e.target.value)} />
        </label>
      </div>
      <button type="submit">Dodaj</button>
    </form>
  );
}