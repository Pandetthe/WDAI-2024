import Produkt from './Produkt';

export default function Koszyk(): JSX.Element {
  return (
    <div>
      <h2>Koszyk</h2>
      <Produkt nazwa="Jabłko" />
      <Produkt nazwa="Gruszka" />
      <Produkt nazwa="Banan" />
      <Produkt nazwa="Pomarańcza" />
      <Produkt nazwa="Winogrona" />
    </div>
  );
}