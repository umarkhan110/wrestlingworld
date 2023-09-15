import client from "../components/ApolloClient";
import { GET_SITEMAP_ALL_URL_POSTS } from "../components/Services/Query";
export async function getServerSideProps({ res }) {
  const siteUrl = "https://wrestlingworld.co"
  const posts = await client.query({ query: GET_SITEMAP_ALL_URL_POSTS });
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"       
          xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
      ${posts.data.posts.nodes
      .map(({ uri, title, date }) => {
        return `<url>
              <loc>${siteUrl + uri}</loc>
              <news:news>
                <news:publication>
                  <news:name>${title.replace(/&/g, '&amp;')}</news:name>
                  <news:language>en</news:language>
                </news:publication>
                <news:publication_date>${date}+01:00</news:publication_date>
                <news:title>${title.replace(/&/g, '&amp;')}</news:title>
              </news:news>
            </url>
          `;
      })
      .join("")}
    </urlset>
  `;
  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();
  return {
    props: {},
  };
}
export default function Site() { }