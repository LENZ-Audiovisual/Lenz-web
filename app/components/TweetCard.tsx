// components/TweetCard.tsx
import Link from 'next/link';

interface TweetCardProps {
  title: string;
  summary: string;
  date: string;
  slug: string; // O final da URL do post (ex: "o-futuro-do-audiovisual")
}

export default function TweetCard({ title, summary, date, slug }: TweetCardProps) {
  return (
    <Link href={`/insights/${slug}`} className="block p-6 bg-gray-800/50 rounded-xl border border-gray-700 hover:bg-gray-800/80 transition duration-200">
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-300 mb-4">{summary}</p>
      <div className="flex items-center justify-between text-sm text-gray-400">
        <time>{date}</time>
        <span className="text-blue-400 hover:underline">Ler mais</span>
      </div>
    </Link>
  );
}