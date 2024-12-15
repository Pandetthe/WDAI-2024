import { useState } from 'react';

export default function Licznik(): JSX.Element {
  const [count, setCount] = useState(0);

  return (
    <div>
      <div>Licznik: {count}</div>
      <button onClick={() => setCount(count + 1)}>Dodaj</button>
    </div>
  );
}