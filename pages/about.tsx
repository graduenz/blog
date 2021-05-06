import { GetStaticProps } from 'next';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import Layout from 'components/layout';
import Head from 'components/head';
import { BlogAbout } from 'types/single';

interface AboutProps {
  data: BlogAbout;
}

export const getStaticProps: GetStaticProps = async () => {
  const url = `${process.env.STRAPI_ENDPOINT}/blog-about`;
  const response = await axios.get<BlogAbout>(url, {
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_JWT_TOKEN}`,
    },
  });

  return {
    props: {
      data: response.data,
    },
  };
};

export default function About(props: AboutProps): JSX.Element {
  const { data } = props;
  return (
    <Layout>
      <Head title="About" />
      <h1 className="text-4xl font-black mb-8">{data.Title}</h1>
      <div className="prose prose-xl">
        <ReactMarkdown>{data.Content}</ReactMarkdown>
      </div>
    </Layout>
  );
}
