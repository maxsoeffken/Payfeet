// components/PostCard.js
'use client';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/de';
dayjs.extend(relativeTime);
dayjs.locale('de');

export default function PostCard({ post }) {
  const ago = post.created_at ? dayjs(post.created_at).fromNow() : '';

  return (
    <article className="post glass">
      <div className="post__avatar">
        <img src={post.author_avatar || '/payfeet-logo.png'} alt="" />
      </div>
      <div className="post__body">
        <header className="post__meta">
          <strong>{post.author_username || 'Payfeet User'}</strong>
          <span className="handle">@{(post.author_username || 'user').toLowerCase()}</span>
          <span className="dot">·</span>
          <time>{ago}</time>
        </header>
        <p className="post__text">{post.content}</p>
      </div>
      <div className="post__menu">⋯</div>
    </article>
  );
}
