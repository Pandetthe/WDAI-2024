import { useState, useEffect } from 'react';

export default function Odliczanie(): JSX.Element {
  const [count, setCount] = useState(15.0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let intervalId: number;
    if (isActive) {
      intervalId = setInterval(() => {
        if (count <= 0) {
          setIsActive(false);
          return;
        }
        setCount(count - 0.1);
      }, 100);
    }
    return () => clearInterval(intervalId);
  }, [count, isActive]);

  const toggleCounting = () => setIsActive(!isActive);

  return (
    <div>
      <div>{count.toFixed(1)} sek</div>
      <button onClick={toggleCounting} disabled={count <= 0}>
        {count <= 0 ? 'Odliczanie zakończone' : isActive ? 'STOP' : 'START'}
      </button>
    </div>
  );
}