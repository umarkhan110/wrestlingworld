import { SINGLEPOST, GET_NEXT_POST, GET_POST_CURSOR, RELATED_CATEGORY } from '../../components/Services/Query';
import client from '../../components/ApolloClient';
import SinglePageLayout from '../../components/common/Layout/SinglePageLayout';
import Headview from '../../components/common/Head';
import SinglePostItem from '../../components/SinglePostItem';
import { useState } from 'react';
import { request } from 'graphql-request'
import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import NewsItem from '../../components/common/NewsItem';
import FooterNewsItem from '../../components/common/FooterNews/FooterNewsItem';
import SectionTitle from '../../components/common/SectionTitle'
import { Waypoint } from 'react-waypoint';
import { useRouter } from 'next/router';
import SinglePostAds from '../../components/common/AdTemplates/SinglePostAds';
import adsData from '../../AdsData';

export default function SingleNews({ slug, postData, slugCategory, QuotesData, RelatedData }) {

  const [isLoadingMoreNews, setIsLoadingMoreNews] = useState(false);

  const [nextPosts, setNextPosts] = useState([])

  const router = useRouter();


  const graphqlUri = 'https://api.wrestlingworld.co/graphql';

  const loadMoreArticle = async () => {
    // if (typeof window != 'undefined' && window.screen.width <= 700) {
    setIsLoadingMoreNews(true);

    const lastPostId =
      nextPosts.length > 0
        ? nextPosts[nextPosts.length - 1].databaseId
        : postData.databaseId;

    const cursor = await request(graphqlUri, GET_POST_CURSOR, { id: lastPostId });
    if (cursor) {

      const { posts: nextPost } = await request(
        graphqlUri,
        GET_NEXT_POST,
        { cursor: cursor.posts.pageInfo.endCursor }
      );

      const postContentArray =
        nextPost.nodes[0].content?.split('<!--nextpage-->');
      if (postContentArray && postContentArray.length > 1) {
        nextPost.nodes[0].hasPagination = true;
        nextPost.nodes[0].hasNext = true;
        nextPost.nodes[0].content = postContentArray[0];
      }
      if (nextPost.nodes[0]) {
        setNextPosts((prev) => [...prev, nextPost.nodes[0]]);
      }

    }

    setIsLoadingMoreNews(false);
    // }
  };


  useScrollPosition(
    ({ prevPos, currPos }) => {
      if (!postData) return;
      const maxPosScrollPage = -(
        document.body.scrollHeight - window.innerHeight
      );
      if (currPos.y <= maxPosScrollPage + 400 && !isLoadingMoreNews) {
        loadMoreArticle();
      }
    },
    [isLoadingMoreNews]
  );


  // for replace the slug
  const changeBrowserURL = (url) => {
    if (window.gtag) {
      window.gtag("event", "page_view", {
        page_path: location.pathname + location.search,
      });
    }
    router.replace(url, undefined, { shallow: true });;
  };

  return (
    <>
      <Headview
        title={postData?.seo?.title}
        description={postData?.seo?.metaDesc}
        keywords={postData?.seo?.metaKeywords}
        Image={postData?.seo?.opengraphImage?.sourceUrl}
      >
        {postData?.seo?.fullHead}
      </Headview>
      <SinglePageLayout QuotesData={QuotesData}>
        <div className='mt-[60px] py-2  dark:text-white text-black flex justify-center items-start'>

          <SinglePostAds adLeftID={adsData?.leftID} adRightID={adsData?.rightID}>
            <div className='flex justify-center items-center flex-col w-full sm:w-[630px]'>

              <SinglePostItem slug={slug} slugCategory={slugCategory} postData={postData} />

              {
                slugCategory === 'news' || slugCategory === 'rumors' ? (
                  <>
                    {

                      nextPosts ? (

                        nextPosts?.map((item, i) => {
                          return (
                            <Waypoint
                              onEnter={() => changeBrowserURL(item.uri)}
                              key={`${item.slug} ${i}` + 2}
                            >
                              <div>
                                {
                                  item?.categories?.edges?.find((i) => i?.isPrimary === true).node?.name === 'News' || item?.categories?.edges?.find((i) => i?.isPrimary === true).node?.name === 'Rumors' ?
                                    <>
                                      <div data-aaad='true' className='w-fit mx-auto my-20 mb-10' data-aa-adunit='/22181265/ww_mob_a_2'></div>
                                      <SinglePostItem slug={slug} slugCategory={slugCategory} postData={item} />
                                    </>
                                    : null
                                }
                              </div>

                            </Waypoint>
                          )
                        })

                      ) : null
                    }


                    {
                      nextPosts ?
                        isLoadingMoreNews && (
                          <div className='my-8 flex justify-center items-center'>
                            <LoadingSpinner />
                          </div>
                        )
                        : null
                    }
                  </>
                ) : null
              }

            </div>
          </SinglePostAds>

        </div>


        <div className={`${slugCategory === 'news' || slugCategory === 'rumors' ? 'hidden' : 'block'} SinglePageFooter_news px-2 sm:px-5 lg:px-10 xl:px-[130px] py-5 relative z-10 bg-[#F8F8F8] dark:bg-[#212121]`}>

          <div className='lg:flex mx-auto w-[fit-content] flex-row items-center hidden'>
            <div data-aaad='true' className='w-fit' data-aa-adunit='/22181265/ww_g_300v_3'></div>
            <div data-aaad='true' className='w-fit' data-aa-adunit='/22181265/ww_g_300v_4'></div>
          </div>

          <div className='block lg:hidden mx-auto w-fit' data-aaad='true' data-aa-adunit='/22181265/ww_mob_g_2'></div>

          <SectionTitle title="Related Posts" />

          <div className='sm:block hidden'>
            <div className='pt-5 grid sm:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 sm:gap-5 gap-0'>
              {
                RelatedData?.map((item) => {
                  return (
                    <FooterNewsItem key={item?.id} item={item} />
                  )
                })
              }
            </div>
          </div>


          <div className='block sm:hidden'>
            <div className='pt-5 grid sm:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 sm:gap-5 gap-0'>
              {
                RelatedData?.map((item) => {
                  return (
                    <NewsItem key={item?.id} item={item} />
                  )
                })
              }
            </div>
          </div>
        </div>

      </SinglePageLayout>
    </>
  )
}


export async function getServerSideProps(context) {

  const slug = context.query.slug;
  const slugCategory = context.query.category;

  const { data } = await client.query({
    query: SINGLEPOST,
    variables: {
      "id": slug
    },
  });


  const RelatedRes = await client.query({
    query: RELATED_CATEGORY,
    variables: {
      "slug": slugCategory,
    },
  });
  const resQuotes = await fetch(`https://api.wrestlingworld.co/wp-json/jet-cct/wrestling_quotes/?_order=asc`)
  const QuotesData = await resQuotes.json()

  return {
    props: {
      postData: data?.post || null,
      slug,
      slugCategory,
      RelatedData: RelatedRes?.data?.category?.posts?.nodes || null,
      QuotesData
    }, // will be passed to the page component as props
  }
}



// >=1510 (300x600)
// >=1230 (160x600)