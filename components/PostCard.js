// components/PostCard.js
'use client';

import Image from 'next/image';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/de';

dayjs.extend(relativeTime);
dayjs.locale('de');

export default function PostCard({ post }) {
  const created = dayjs(post.created_at);

  return (
    <article className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-md hover:bg-white/7 transition">
      <header className="flex items-center gap-3 mb-3">
        <div className="relative h-10 w-10 overflow-hidden rounded-full ring-1 ring-white/10">
          <Image
            src={post.author_avatar_url || '/payfeet-logo.png'}
            alt=""
            fill
            className="object-cover"
          />
        </div>
        <div className="leading-tight">
          <div className="font-medium text-white">
            {post.author_username || 'Payfeet'}
          </div>
          <div className="text-xs text-white/60">
            {created.fromNow()}
          </div>
        </div>
      </header>

      {post.content && (
        <p className="text-white/90 whitespace-pre-line mb-3">
          {post.content}
        </p>
      )}

      {post.image_url && (
        <div className="relative w-full overflow-hidden rounded-xl border border-white/10">
          <Image
            src={post.image_url}
            alt=""
            width={1200}
            height={1200}
            className="w-full h-auto object-cover"
          />
        </div>
      )}

      <footer className="mt-3 flex items-center gap-4 text-sm text-white/70">
        <button className="hover:text-white transition">❤️ {post.likes_count ?? 0}</button>
        <button className="hover:text-white transition">💬 {post.comments_count ?? 0}</button>
        <button className="hover:text-white transition">↗️ Teilen</button>
      </footer>
    </article>
  );
}
