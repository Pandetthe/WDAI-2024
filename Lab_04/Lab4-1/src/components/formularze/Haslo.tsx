import { useState } from 'react';

export default function Haslo(): JSX.Element {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const getMessage = () => {
    if (!password && !confirmPassword) {
      return 'Proszę wprowadzić hasło';
    }
    if (password !== confirmPassword) {
      return 'Hasła nie są zgodne';
    }
    return '';
  };

  return (
    <div>
      <div>
        Hasło: <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div>
        Powtórz Hasło: <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
      </div>
      <div>{getMessage()}</div>
    </div>
  );
}