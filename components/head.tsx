import NextHead from 'next/head';

interface HeadProps {
  title: string | null;
}

export default function Head(props: HeadProps): JSX.Element {
  const { title } = props;
  return (
    <NextHead>
      <title>
        {title ? `${title} - ` : ''}
        blog.rdnz.dev
      </title>
    </NextHead>
  );
}
