import Link from 'next/link';
import { Tag } from 'types/collection';

interface TagProps {
  tag: Tag;
}

export default function Head(props: TagProps): JSX.Element {
  const { tag } = props;
  return (
    <Link href={`/articles/?tag=${tag.Slug}`}>
      <a className="p-2 bg-gray-100 text-gray-700 text-xs rounded">
        {tag.Name}
      </a>
    </Link>
  );
}
