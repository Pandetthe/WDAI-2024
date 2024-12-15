import { useState } from 'react';

export default function Logowanie(): JSX.Element {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const isFormValid = () => {
    return username && password && confirmPassword;
  };

  const handleLogin = () => {
    if (password !== confirmPassword) {
      alert('Hasła nie są zgodne');
    } else {
      alert('Zalogowano poprawnie');
    }
  };

  return (
    <div>
      <div>
        Nazwa użytkownika: <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        Hasło: <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div>
        Powtórz Hasło: <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
      </div>
      <div>
        <button onClick={handleLogin} disabled={!isFormValid()}>Logowanie</button>
      </div>
    </div>
  );
}