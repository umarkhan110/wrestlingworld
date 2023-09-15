import Headview from "../../components/common/Head";
import {
  GET_SINGLE_TAG,
  LOADMORE_SINGLE_TAG,
} from "../../components/Services/Query";
import client from "../../components/ApolloClient";

import { useState } from "react";
import { request } from "graphql-request";
import LoadingSpinner from "../../components/common/LoadingSpinner";

import dynamic from "next/dynamic";
const SearchBar = dynamic(
  () => import("../../components/common/Layout/searchBar"),
  {
    ssr: false,
  }
);

const SinglePostAds = dynamic(() =>
  import("../../components/common/AdTemplates/SinglePostAds")
);
const Layout = dynamic(() => import("../../components/common/Layout"));
const NewsItem = dynamic(() => import("../../components/common/NewsItem"));

export default function SingleAuthorPage({ TagData, slug, QuotesData }) {
  const { posts } = TagData?.tag;
  const [isLoadingMoreNews, setIsLoadingMoreNews] = useState(false);
  const [hasNextCursor, setHasNextCursor] = useState(null);
  const [postsData, setPostsData] = useState([...posts?.nodes]);

  // Load more start from here

  const cursorId = posts?.pageInfo.endCursor;

  const variable = {
    id: slug,
    after: hasNextCursor || cursorId,
  };

  const handleLoadMoreNews = () => {
    if (!postsData) return;
    setIsLoadingMoreNews(true);
    request(
      "https://api.wrestlingworld.co/graphql",
      LOADMORE_SINGLE_TAG,
      variable
    ).then((data) => {
      if (data) {
        setPostsData([...postsData, ...data.posts.nodes]);

        setHasNextCursor(data.category?.posts?.pageInfo?.endCursor);
        setIsLoadingMoreNews(false);
      }
    });
  };

  // end of loadmore function

  return (
    <Layout QuotesData={QuotesData}>
      <Headview
        title={`Tag ${slug}`}
        description={TagData?.seo?.metaDesc}
        keywords={TagData?.seo?.metaKeywords}
        Image={TagData?.seo?.opengraphImage?.sourceUrl}
      >
        {TagData?.seo?.fullHead}
      </Headview>

      <div className="Category__wraper mx-2 ">
        <div className=" py-[5px] relative dark:text-white text-black  flex justify-center items-start">
          <SinglePostAds>
            <div className="w-full md:w-[600px] xl:w-[630px]">
              <div className="pb-5">
                <SearchBar />
              </div>
              <div className="py-5">
                <h6 className="cate33 text-xs font-normal uppercase text-gray-400 text-center">
                  Tag
                </h6>
                <h1 className="category_Name_display text-4xl font-black uppercase text-center">
                  {slug}
                </h1>
              </div>

              {postsData.length > 1
                ? postsData?.map((item) => {
                    return (
                      <NewsItem key={item?.id} item={item} isLoading={false} />
                    );
                  })
                : new Array(12)
                    .fill("1")
                    .map((x, i) => <NewsItem key={i} isLoading />)}
              {posts?.pageInfo.hasNextPage ? (
                isLoadingMoreNews ? (
                  <div className="mt-8 flex justify-center items-center">
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
              ) : null}
            </div>
          </SinglePostAds>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const slug = context.query.slug;

  const { data } = await client.query({
    query: GET_SINGLE_TAG,
    variables: {
      id: slug,
    },
  });

  const resQuotes = await fetch(
    `https://api.wrestlingworld.co/wp-json/jet-cct/wrestling_quotes/?_order=asc`
  );
  const QuotesData = await resQuotes.json();

  return {
    props: {
      slug,
      TagData: data || null,
      QuotesData,
    }, // will be passed to the page component as props
  };
}
