# blog
---

This is a simple blog made by Next.js using a Strapi as a back end, which can be easily deployed on .

A sample is live at https://blog.rdnz.dev, which is the repository author's personal blog.

## Environment variables

- `STRAPI_ENDPOINT` is the endpoint of your Strapi;
- `STRAPI_JWT_TOKEN` is a valid JWT token you must manually generate before a deploy in order to fetch data from Strapi Content API.
  - Will be replaced soon by a better mechanism with read-only access to Strapi's API using Community Edition.

## Strapi configuration

Please see https://github.com/graduenz/rdnz-dev-strapi.

## TODO

- Dark mode
- Responsiveness
- Search
- Comments
- Share post
- SEO
