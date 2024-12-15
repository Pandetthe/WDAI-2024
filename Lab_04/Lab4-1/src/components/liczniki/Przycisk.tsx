interface PrzyciskProps {
  onIncrement: () => void;
}

export default function Przycisk({ onIncrement }: PrzyciskProps): JSX.Element {
  return <button onClick={onIncrement}>Dodaj</button>;
}