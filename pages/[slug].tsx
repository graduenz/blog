import { GetStaticPaths, GetStaticProps } from 'next';
import { useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import highlight from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
import { DateTime } from 'luxon';
import Layout from 'components/layout';
import Head from 'components/head';
import Tag from 'components/tag';
import { Article } from 'types/collection';

interface ArticleProps {
  article: Article;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const url = `${process.env.STRAPI_ENDPOINT}/articles`;
  const response = await axios.get<Article[]>(url, {
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_JWT_TOKEN}`,
    },
  });

  const allArticles = response.data;
  const paths = allArticles.map((article) => ({
    params: {
      slug: article.Slug,
    },
  }));

  return {
    paths,
    // fallback as false will make the site faster, but should be true when there's millions
    // of articles because of building time
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params;
  const url = `${process.env.STRAPI_ENDPOINT}/articles?Slug=${slug}`;
  const response = await axios.get<Article[]>(url, {
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_JWT_TOKEN}`,
    },
  });

  if (!response.data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      article: response.data[0],
    },
  };
};

export default function Index(props: ArticleProps): JSX.Element {
  const { article } = props;
  const publishedAt = DateTime.fromISO(article.PublishedAt).toFormat('LLL dd, yyyy');

  useEffect(() => {
    highlight.highlightAll();
  });

  function renderTags(): JSX.Element {
    if (article.tags) {
      return (
        <div className="space-x-2">
          <span className="text-sm">Tags:</span>
          {article.tags.map((t) => (
            <Tag key={t.Slug} tag={t} />
          ))}
        </div>
      );
    }
    return null;
  }

  return (
    <Layout>
      <Head title={article.Title} />
      <article className="flex flex-col mt-8 mb-16">
        <h1 className="text-6xl font-black text-justify mb-4">{article.Title}</h1>
        <p className="text-lg text-gray-400 italic text-justify mb-4">
          {article.Description}
        </p>
        <div className="flex flex-row text-sm text-gray-700 space-x-4 leading-6 mb-8">
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
        <div className="prose prose-xl mb-8">
          <ReactMarkdown>{article.Content}</ReactMarkdown>
        </div>
        {renderTags()}
      </article>
    </Layout>
  );
}
