import { useState, useEffect } from 'react';

export default function Licznik(): JSX.Element {
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log(`Licznik zwiększył się do ${count}.`);
  }, [count]);
  useEffect(() => {
    console.log('Hello world');
  }, [])

  return (
    <div>
      <div>Licznik: {count}</div>
      <button onClick={() => setCount(count + 1)}>Dodaj</button>
    </div>
  );
}