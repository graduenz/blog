import Link from 'next/link';
import { DateTime } from 'luxon';
import { Article } from 'types/collection';

interface ArticleItemProps {
  article: Article;
}

export default function ArticleItem(props: ArticleItemProps): JSX.Element {
  const { article } = props;
  const publishedAt = DateTime.fromISO(article.PublishedAt).toFormat('LLL dd, yyyy');

  return (
    <div className="flex flex-col mb-4 mt-4">
      <Link href={`/${article.Slug}`}>
        <a><h2 className="text-3xl font-bold text-justify mb-2">{article.Title}</h2></a>
      </Link>
      <p className="text-gray-700 text-justify mb-2">{article.Description}</p>
      <div className="flex flex-row text-sm text-gray-400 space-x-4 leading-6 mb-8">
        <div className="flex flex-row space-x-2">
          <img
            className="rounded-full"
            src={article.author.Picture.url}
            alt={article.author.Picture.alternativeText}
            width={24}
            height={24}
          />
          <span>{article.author.Name}</span>
        </div>
        <div>
          {publishedAt}
        </div>
      </div>
      <hr />
    </div>
  );
}
