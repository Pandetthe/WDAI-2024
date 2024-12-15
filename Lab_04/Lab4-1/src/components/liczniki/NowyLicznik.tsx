import { useState } from 'react';
import Przycisk from './Przycisk';

export default function NowyLicznik(): JSX.Element {
  const [count, setCount] = useState(0);

  function handleIncrement() {
    setCount(count + 1);
  }

  return (
    <div>
      <div>Licznik: {count}</div>
      <Przycisk onIncrement={handleIncrement} />
    </div>
  );
}