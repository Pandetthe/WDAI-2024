import React, { useEffect, useState } from 'react';
import Komentarz from './Komentarz';
import { KomentarzProps } from './Komentarz';

const Komentarze: React.FC = () => {
  const [komentarze, setKomentarze] = useState<KomentarzProps[]>([]);

  useEffect(() => {
    fetch('https://dummyjson.com/comments')
      .then(response => response.json())
      .then(data => {
        setKomentarze(data.comments);
      })
      .catch(error => {
        console.error('Error fetching comments:', error);
      });
  }, []);

  return (
    <div>
      {komentarze.map(komentarz => (
        <Komentarz
          key={komentarz.id}
          body={komentarz.body}
          id={komentarz.id}
          likes={komentarz.likes}
          postId={komentarz.postId}
          user={komentarz.user} />
      ))}
    </div>
  );
};

export default Komentarze;