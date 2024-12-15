import { useState } from 'react';

export interface User {
  id: number;
  username: string;
  fullName: string;
}

export interface KomentarzProps {
  id: number;
  body: string;
  postId: number;
  likes: number;
  user: User;
}

export default function Komentarz({ id, body, postId, likes, user } : KomentarzProps): JSX.Element {
  const [likeCount, setLikeCount] = useState(likes);

  const handleLike = () => {
    setLikeCount(likeCount + 1);
  };

  const handleDislike = () => {
    setLikeCount(likeCount - 1);
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0', borderRadius: '5px' }}>
      <div style={{ marginBottom: '10px' }}>
        <strong>{user.fullName} (@{user.username})</strong>
      </div>
      <div style={{ marginBottom: '10px' }}>
        {body}
      </div>
      <div style={{ marginBottom: '10px' }}>
        <small>ID: {id} | Post ID: {postId}</small>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <button onClick={handleLike} style={{ marginRight: '10px' }}>👍</button>
        <button onClick={handleDislike}>👎</button>
        <span style={{ marginLeft: '10px' }}>{likeCount} likes</span>
      </div>
    </div>
  );
}