import { GetStaticProps } from 'next';
import Link from 'next/link';
import axios from 'axios';
import Layout from 'components/layout';
import Head from 'components/head';
import ArticleItem from 'components/article-item';
import { Article } from 'types/collection';

interface IndexProps {
  recentArticles: Article[],
}

export const getStaticProps: GetStaticProps = async () => {
  const url = `${process.env.STRAPI_ENDPOINT}/articles?_sort=PublishedAt:DESC&_limit=4`;
  const response = await axios.get<Article[]>(url, {
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_JWT_TOKEN}`,
    },
  });

  return {
    props: {
      recentArticles: response.data,
    },
  };
};

export default function Index(props: IndexProps): JSX.Element {
  const { recentArticles } = props;

  return (
    <Layout>
      <Head title="Home" />
      <h1 className="text-4xl font-black mb-2">Recent articles</h1>
      <div className="mb-8">
        <Link href="/articles">
          <a className="underline">See all articles &gt;</a>
        </Link>
      </div>
      {recentArticles.map((article) => (
        <ArticleItem key={article.Slug} article={article} />
      ))}
    </Layout>
  );
}
