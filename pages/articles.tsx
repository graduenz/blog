import { useEffect, useState } from 'react';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import axios from 'axios';
import Layout from 'components/layout';
import Head from 'components/head';
import ArticleItem from 'components/article-item';
import { Article, Tag } from 'types/collection';

import {
  FormControl, InputLabel, Select, MenuItem, TextField,
} from '@material-ui/core';

import {
  Pagination,
} from '@material-ui/lab';

interface ArticlesProps {
  allArticles: Article[];
  allTags: Tag[];
}

// the main reason of caching all articles is that Heroku's free tier can take a lot of time to
// respond; if the blog has lots of articles, you should think of another way of browsing articles,
// like having better server infrastructure
export const getStaticProps: GetStaticProps = async () => {
  let url = `${process.env.STRAPI_ENDPOINT}/articles?_sort=PublishedAt:DESC`;
  let response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_JWT_TOKEN}`,
    },
  });

  const allArticles = response.data;

  url = `${process.env.STRAPI_ENDPOINT}/tags?_sort=Name:ASC`;
  response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_JWT_TOKEN}`,
    },
  });

  const allTags = response.data;

  return {
    props: {
      allArticles,
      allTags,
    },
  };
};

const PAGE_SIZES = [4, 8, 16, 32, 64];

export default function Articles(props: ArticlesProps): JSX.Element {
  const router = useRouter();

  const { allArticles, allTags } = props;

  const [filteredArticles, setFilteredArticles] = useState([] as Article[]);
  const [pageArticles, setPageArticles] = useState([] as Article[]);
  const [articlesCount, setArticlesCount] = useState(0);
  const [pageSize, setPageSize] = useState(0);
  const [page, setPage] = useState(0);
  const [textSearch, setTextSearch] = useState('');
  const [tag, setTag] = useState('');

  useEffect(() => { setTag(router.query.tag as string); }, [router.query.tag]);

  useEffect(() => {
    let filtered = allArticles;

    if (tag) {
      filtered = filtered.filter(
        (article) => article.tags.findIndex((t) => t.Slug === tag) > -1,
      );
    }

    if (textSearch) {
      filtered = filtered.filter(
        (article) => article.Title.toLowerCase().indexOf(textSearch.toLowerCase()) > -1
                  || article.Description.toLowerCase().indexOf(textSearch.toLowerCase()) > -1,
      );
    }

    setFilteredArticles(filtered);
    setArticlesCount(filtered.length);
  }, [allArticles, tag, textSearch]);

  useEffect(() => {
    const p = parseInt(router.query.page as string, 10);
    setPage(Number.isNaN(p) ? 1 : p);
  }, [router.query.page]);

  useEffect(() => {
    const p = parseInt(router.query.pageSize as string, 10);
    setPageSize(Number.isNaN(p) ? PAGE_SIZES[0] : p);
  }, [router.query.pageSize]);

  useEffect(() => {
    const skip = (page * pageSize) - pageSize;
    setPageArticles(filteredArticles.slice(skip, skip + pageSize));
  }, [page, pageSize, filteredArticles]);

  function getDescription() {
    return `Showing ${pageArticles.length} of ${articlesCount} articles.`;
  }

  function onPageChanged(value: number): void {
    router.query.page = value.toString();
    router.push(router, undefined, { shallow: true });
  }

  function onPageSizeChanged(value: number): void {
    router.query.pageSize = value.toString();
    router.push(router, undefined, { shallow: true });
  }

  function onTagChanged(value: string): void {
    router.query.tag = value;
    router.push(router, undefined, { shallow: true });
  }

  function onTextSearchChanged(value: string): void {
    setTextSearch(value);
  }

  return (
    <Layout>
      <Head title="Articles" />
      <h1 className="text-4xl font-black mb-2">
        Articles
      </h1>
      <div className="mb-2">
        {getDescription()}
      </div>
      <div className="mb-8 flex flex-col space-y-2">
        <div>
          <TextField
            label="Search"
            value={textSearch}
            onChange={(evt) => onTextSearchChanged(evt.target.value as string)}
            fullWidth
          />
        </div>
        <div className="flex flex-row space-x-4">
          <div className="w-20">
            <FormControl fullWidth>
              <InputLabel>Page size</InputLabel>
              <Select
                value={pageSize}
                onChange={(evt) => onPageSizeChanged(evt.target.value as number)}
              >
                {PAGE_SIZES.map((size) => (
                  <MenuItem key={size} value={size}>
                    {size}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="w-40">
            <FormControl fullWidth>
              <InputLabel>Tag</InputLabel>
              <Select
                value={tag || ''}
                onChange={(evt) => onTagChanged(evt.target.value as string)}
              >
                <MenuItem value="">None</MenuItem>
                {allTags.map((t) => (
                  <MenuItem key={t.Slug} value={t.Slug}>
                    {t.Name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
      </div>
      {pageArticles.map((article) => (
        <ArticleItem key={article.Slug} article={article} />
      ))}
      <Pagination
        count={Math.ceil(articlesCount / pageSize)}
        page={page}
        onChange={(_, value) => onPageChanged(value as number)}
        shape="rounded"
      />
    </Layout>
  );
}
