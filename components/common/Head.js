import Head from 'next/head';

export default function HeadView({title, description, keywords, children, Image}) {
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta charSet="utf-8" />
                <meta name="robots" content="index,follow" />
                <meta name="og:description" content={description} />
                <meta name="keywords" content={keywords} />
                <meta name="og:site_name" content="Wrestling World" />
                <meta property="og:image" content={Image} />
                {
                    children
                }
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
        </>
    )
}
