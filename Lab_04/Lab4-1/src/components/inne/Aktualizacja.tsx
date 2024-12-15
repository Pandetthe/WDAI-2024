import { useState } from 'react';

export default function Aktualizacja(): JSX.Element {
  const [produkt, setProdukt] = useState({ nazwa: 'Pomidor', cena: 50 });

  const zmienCene = () => {
    setProdukt(prevProdukt => ({
      ...prevProdukt,
      cena: 100
    }));
  };

  return (
    <div>
      <div>Aktualnie {produkt.nazwa} kosztuje {produkt.cena}</div>
      <button onClick={zmienCene}>Zmień cenę</button>
    </div>
  );
}