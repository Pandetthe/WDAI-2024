import React, { useState } from 'react';

export default function Formularz(): JSX.Element {
  const [text, setText] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  return (
    <div>
      <input type="text" value={text} onChange={handleChange} />
      <div>{text}</div>
    </div>
  );
}