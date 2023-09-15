import client from "../../components/ApolloClient";
import { SINGLE_CATEGORY } from "../../components/Services/Query";
export default function feed() {
    return (<></>)
}

export async function getServerSideProps({ res }) {
    const slug = 'rumors'

    const { data } = await client.query({
        query: SINGLE_CATEGORY,
        variables: {
            slug,
            "slug1": slug
        },
    });

    // <description>${node.content.replaceAll('&','')}</description>
    let items = `${data.category.posts.nodes.map(node => {
      console.log(node);
        return `<item>
        <title>${node.title.replaceAll('&','')}</title>
        <link>/rumors/${node.slug}</link>
        <pubDate>${node.date}</pubDate>
        <guid>/rumors/${node.slug}</guid>
        <media:thumbnail xmlns:media="http://search.yahoo.com/mrss/"
          url="${node.featuredImage.node.sourceUrl}"
          height="600" width="900" />
      </item>`
    })}`

    const channelTitle = 'News Feed';
    const channelLink = 'http://wrestlingworld.co';
    const channelFeed = 'http://wrestlingworld.co/rumors';
    const channelLanguage = 'en-us';

    let rss = `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
      <channel>
        <title>${channelTitle}</title>
        <link>${channelLink}</link>
        <atom:link href="${channelFeed}" rel="self"/>
        <language>${channelLanguage}</language>
        <lastBuildDate>${data.updated}</lastBuildDate>
        <image>
          <title>${channelTitle}</title>
          <link>${channelLink}</link>
        </image>
        ${items}
      </channel>
    </rss>`;

    res.setHeader('Content-Type', 'text/xml');
    res.write(rss);
    res.end();

    return {
        props: {},
    };
}