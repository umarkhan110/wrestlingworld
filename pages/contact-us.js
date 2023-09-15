import Link from 'next/link'
import Headview from '../components/common/Head';
import { GET_SEO_PAGE } from '../components/Services/Query';
import client from '../components/ApolloClient'
import Layout from '../components/common/Layout'
export default function ContactUs({ SeoData, QuotesData }) {
    return (
        <>
            <Headview
                title={SeoData?.title}
                description={SeoData?.metaDesc}
                keywords={SeoData?.metaKeywords}
                Image={SeoData?.opengraphImage?.sourceUrl}
            >{SeoData?.fullHead} </Headview>
            <Layout QuotesData={QuotesData}>
            <div className=' my-5 mx-10 h-screen'>
                <h1 className="text-[20px] md:text-[30px]  font-semibold uppercase text-center py-10">Contact us</h1>
                <p className='py-[32px] bg-white dark:bg-[#161616] rounded px-5 md:px-10 font_nunito text-lg leading-8 font-normal'>
                    Thank you for visiting <Link href="/"><a className=' text-red-700'>WrestlingWorld.co.</a></Link> If you have a comment, question or correction, please email us at <Link href="mailto:theauthority@wrestlingworld.co"><a className=' text-red-700'>theauthority@wrestlingworld.co.</a></Link>

                    When you contact us, please be sure to include your name and e-mail address so we can get back to you.
                </p>
            </div>
            </Layout>

        </>
    )
}


export async function getStaticProps() {
    const resSeo = await client.query({ query: GET_SEO_PAGE, variables: { id: 484 } });
    const resQuotes = await fetch(`https://api.wrestlingworld.co/wp-json/jet-cct/wrestling_quotes/?_order=asc`)
    const QuotesData = await resQuotes.json()
    return {
        props: {
            SeoData: resSeo?.data?.page?.seo
        }, // will be passed to the page component as props
    }
}
