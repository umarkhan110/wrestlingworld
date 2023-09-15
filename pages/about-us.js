import Link from 'next/link'
import Headview from '../components/common/Head';
import { GET_SEO_PAGE } from '../components/Services/Query';
import client from '../components/ApolloClient'
import Layout from '../components/common/Layout'
export default function AboutUs({ SeoData, QuotesData }) {
  return (
    <>
      <Headview
        title={SeoData?.title}
        description={SeoData?.metaDesc}
        keywords={SeoData?.metaKeywords}
        Image={SeoData?.opengraphImage?.sourceUrl}
      >{SeoData?.fullHead} </Headview>
      <Layout QuotesData={QuotesData}>
        <div className='my-5 mx-10 h-screen'>
        <h1 className="text-[20px] md:text-[30px]  font-semibold uppercase text-center py-10">About us</h1>
          <div className=' py-[32px] bg-white dark:bg-[#161616] rounded px-5 md:px-10 font_nunito text-lg leading-8 font-normal'>
            <p className='pb-5'>
              <Link href="/"><a className='text-red-700'>WrestlingWorld.co</a></Link> is committed to bringing you daily content related to WWE and
              AEW.
            </p>
            <p>
              Our information-based articles range from news, rumors, weekly results, pay-per-views and lists on a vast
              array of topics. From Raw, SmackDown, NXT, and Dynamite, to Royal Rumble, Survivor Series, WrestleMania,
              Double or Nothing, All Out, Revolution and more!
            </p>
            <br />
            <p>
              Looking for the latest news or rumor about your favorite show? We have it! Maybe you want to know about what
              are your favorite Superstars up to, we have that information too! We don’t provide fake news – at best, it
              will be a rumor.
            </p>
            <br />
            <p>
              Make sure to bookmark our website and follow us on{" "}
              <Link href="https://www.facebook.com/wrestlingworld"><a className='text-red-700' rel="noreferrer" target="_blank">Facebook</a></Link> for all the latest updates in the pro wrestling world!
            </p>
          </div>
        </div>
      </Layout>
    </>
  )
}



export async function getStaticProps() {
  const resSeo = await client.query({ query: GET_SEO_PAGE, variables: { id: 1891 } });
  const resQuotes = await fetch(`https://api.wrestlingworld.co/wp-json/jet-cct/wrestling_quotes/?_order=asc`)
  const QuotesData = await resQuotes.json()
  return {
    props: {
      SeoData: resSeo?.data?.page?.seo,
      QuotesData
    }, // will be passed to the page component as props
  }
}
