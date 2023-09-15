import Headview from '../../components/common/Head';
import { SINGLE_CATEGORY, LOAD_MORE_SINGLE_CATEGORY } from '../../components/Services/Query';
import client from '../../components/ApolloClient';
import NewsItem from '../../components/common/NewsItem';
import Layout from '../../components/common/Layout';
import { useEffect, useState } from 'react'
import { request } from 'graphql-request';
import LoadingSpinner from '../../components/common/LoadingSpinner'
import dynamic from 'next/dynamic';
import SinglePostAds from '../../components/common/AdTemplates/SinglePostAds';
const SearchBar = dynamic(() => import('../../components/common/Layout/searchBar'), {
    ssr: false
  })
  

export default function Category({ categoryData, slug, QuotesData }) {
    // const { posts } = categoryData;
    const posts = categoryData?.posts || []
    const [isLoadingMoreNews, setIsLoadingMoreNews] = useState(false);
    const [hasNextCursor, setHasNextCursor] = useState(null);
    const [postsData, setPostsData] = useState([]);


    useEffect(() => {
        setPostsData([...posts?.nodes])
    }, [categoryData, posts?.nodes])

    // Load more start from here 

    const cursorId = posts?.pageInfo?.endCursor;

    const variable = {
        "slug": slug,
        "slug1": slug,
        "after": hasNextCursor || cursorId
    }


    const handleLoadMoreNews = () => {
        if (!postsData) return;
        setIsLoadingMoreNews(true);
        request(
            'https://api.wrestlingworld.co/graphql',
            LOAD_MORE_SINGLE_CATEGORY,
            variable
        ).then((data) => {
            if (data) {

                setPostsData([...postsData, ...data.category.posts.nodes]);

                setHasNextCursor(data.category?.posts?.pageInfo?.endCursor)
                setIsLoadingMoreNews(false);
            }
        });
    };

    // end of loadmore function




    return (
        <Layout QuotesData={QuotesData}>
            <Headview
                title={categoryData?.seo?.title}
                description={categoryData?.seo?.metaDesc}
                keywords={categoryData?.seo?.metaKeywords}
                Image={categoryData?.seo?.opengraphImage?.sourceUrl}
            >
                {categoryData?.seo?.fullHead}
            </Headview>

            <div className='Category__wraper mx-2 '>

                <div className=' py-[5px] relative dark:text-white text-black  flex justify-center items-start'>

                    <SinglePostAds >

                    <div className='w-full md:w-[600px] xl:w-[630px]'>
                        <div className='pb-5'>
                            <SearchBar />
                        </div>
                        <div className='py-5'>
                            <h6 className='cate33 text-xs font-normal uppercase text-gray-400 text-center'>CATEGORY</h6>
                            <h1 className='category_Name_display text-4xl font-black uppercase text-center'>{categoryData?.name}</h1>
                        </div>

                        {
                            postsData.length > 1 ? (
                                postsData?.map((item) => {
                                    return (
                                        <NewsItem key={item?.id} item={item} category={slug} isLoading={false} />
                                    )
                                })
                            ) : new Array(12)
                            .fill('1')
                            .map((x, i) => (
                              <NewsItem key={i} isLoading />
                            ))

                        }
                        {
                            isLoadingMoreNews ? (
                                <div className='mt-8 flex justify-center items-center'>
                                    <LoadingSpinner />
                                </div>
                            ) : (
                                <button
                                    onClick={handleLoadMoreNews}
                                    className="w-full uppercase  flex justify-center items-center mt-8 mx-auto bg-[#ce061e] hover:bg-[#ce061e] text-[#fff] hover:text-[#fff] hover:border-[#ce061e] rounded-md  pt-1 pb-0.5 md:pt-2 md:pb-1 font-khand-headers border px-4 border-[#ce061e]  font-semibold  text-[14px] md:text-[16px]"
                                >
                                    Load more
                                </button>
                            )
                        }
                    </div>
                    </SinglePostAds>

             


                </div>
            </div>
        </Layout>
    )
}


export async function getServerSideProps(context) {

    const slug = context.query.category

    const { data } = await client.query({
        query: SINGLE_CATEGORY,
        variables: {
            slug,
            "slug1": slug
        },
    });
    const resQuotes = await fetch(`https://api.wrestlingworld.co/wp-json/jet-cct/wrestling_quotes/?_order=asc`)
    const QuotesData = await resQuotes.json()


    return {
        props: {
            slug,
            categoryData: data?.category || null,
            QuotesData
        }, // will be passed to the page component as props
    }
}