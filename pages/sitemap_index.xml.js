import client from "../components/ApolloClient";
import { GET_ALL_CATEGORIES, SINGLE_CATEGORY } from "../components/Services/Query";
import fs from 'fs'

export async function getServerSideProps({ res }) {
    const siteUrl = "https://wrestlingworld.co"

    const staticPages = fs
        .readdirSync("pages")
        .filter((staticPage) => {
            return (
                // Filter thos pages to not inlcude them in the sitemap
                !["_app.tsx", "_document.tsx", "sitemap_index.xml.tsx", "404.tsx", "index.tsx"].includes(staticPage) &&
                // Excludes directories
                /.js$/.test(staticPage)
            );
        })
        .map((staticPagePath) => {
            return `${siteUrl}/${staticPagePath.split(".js")[0]}`;
        });
    staticPages.push(siteUrl + "/");

    const categories_res = await client.query({ query: GET_ALL_CATEGORIES });

    const categories = (categories_res.data.categories);

    const categoriesPages = categories.nodes.map(({ slug }) => `${siteUrl}/${slug}`);

    const allPages = [...staticPages, ...categoriesPages];
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${allPages
            .map((url) => {
                return `
            <url>
              <loc>${url}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>1.0</priority>
            </url>
          `;
            })
            .join("")}
    </urlset>
  `;

    res.setHeader("Content-Type", "text/xml");
    res.write(sitemap);
    res.end();

}
export default function Site() { }