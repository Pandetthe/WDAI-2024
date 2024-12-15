import { useState, useEffect } from 'react';

export default function Licznik(): JSX.Element {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const savedCount = localStorage.getItem('count');
    if (savedCount !== null) {
      const parsedCount = parseInt(savedCount, 10);
      if (!isNaN(parsedCount)) {
        setCount(parsedCount);
      }
    }
  }, []);
  useEffect(() => {
    localStorage.setItem('count', count.toString());
  }, [count]);

  return (
    <div>
      <div>Licznik: {count}</div>
      <button onClick={() => setCount(count + 1)}>Dodaj</button>
    </div>
  );
}