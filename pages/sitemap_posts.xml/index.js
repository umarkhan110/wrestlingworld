// pages/server-sitemap.xml/index.tsx

import { getServerSideSitemap } from 'next-sitemap'
import {GET_SITEMAP_URI_POSTS} from '../../components/Services/Query';
import client from '../../components/ApolloClient';

export const getServerSideProps = async (ctx) => {
    const resNews = await client.query({ query: GET_SITEMAP_URI_POSTS });

    const fields = resNews.data.posts?.nodes?.map(function (post) { return ({
        loc: "https://wrestlingworld.co".concat(post.uri),
        lastmod: new Date().toISOString(),
    }); });
    

  return getServerSideSitemap(ctx, fields)
}

// Default export to prevent next.js errors
export default function Sitemap() {}