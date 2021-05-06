import { GetStaticProps } from 'next';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import Layout from 'components/layout';
import Head from 'components/head';
import { BlogContact } from 'types/single';

interface ContactProps {
  data: BlogContact;
}

export const getStaticProps: GetStaticProps = async () => {
  const url = `${process.env.STRAPI_ENDPOINT}/blog-contact`;
  const response = await axios.get<BlogContact>(url, {
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

export default function Contact(props: ContactProps): JSX.Element {
  const { data } = props;
  return (
    <Layout>
      <Head title="Contact" />
      <h1 className="text-4xl font-black mb-8">{data.Title}</h1>
      <div className="prose prose-xl">
        <ReactMarkdown>{data.Content}</ReactMarkdown>
      </div>
    </Layout>
  );
}
