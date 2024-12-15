import React, { useState, useEffect } from 'react';

export default function Tytul(): JSX.Element {
  const [title, setTitle] = useState('');

  useEffect(() => {
    document.title = title;
  }, [title]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  return (
    <div>
      <input type="text" value={title} onChange={handleChange} placeholder="Wpisz tytuł strony" />
    </div>
  );
}