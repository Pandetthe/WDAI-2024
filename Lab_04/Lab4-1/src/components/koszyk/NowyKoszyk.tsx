import Produkt from './Produkt';

export default function NowyKoszyk(): JSX.Element {
  const produkty = ["Jabłko", "Gruszka", "Banan", "Pomarańcza", "Winogrona"];
  return (
    <div>
      <h2>NowyKoszyk</h2>
      {produkty.map((nazwa, index) => (
        <Produkt key={index} nazwa={nazwa} />
      ))}
    </div>
  );
}