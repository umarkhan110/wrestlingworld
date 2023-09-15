import {
  SEARCH_ARTICELS,
  LOAD_MORE_SEARCH_ARTICELS,
} from "../components/Services/Query";
import client from "../components/ApolloClient";

import { useState } from "react";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { request } from "graphql-request";
import dynamic from "next/dynamic";
const SearchBar = dynamic(
  () => import("../components/common/Layout/searchBar"),
  {
    ssr: false,
  }
);

const Layout = dynamic(() => import("../components/common/Layout"));
const Headview = dynamic(() => import("../components/common/Head"));
const NewsItem = dynamic(() => import("../components/common/NewsItem"));
const SinglePostAds = dynamic(() =>
  import("../components/common/AdTemplates/SinglePostAds")
);

export default function Search({ resultData, query, QuotesData }) {
  const [postsData, setPostsData] = useState([...resultData?.nodes]);
  const [isLoadingMoreNews, setIsLoadingMoreNews] = useState(false);
  const [hasNextCursor, setHasNextCursor] = useState(null);
  const cursorId = resultData?.pageInfo.endCursor;

  const variable = {
    query,
    after: hasNextCursor || cursorId,
  };

  const handleLoadMoreNews = () => {
    if (!postsData) return;
    setIsLoadingMoreNews(true);
    request(
      "https://api.wrestlingworld.co/graphql",
      LOAD_MORE_SEARCH_ARTICELS,
      variable
    ).then((data) => {
      if (data) {
        setPostsData([...postsData, ...data.posts.nodes]);

        setHasNextCursor(data?.posts?.pageInfo?.endCursor);

        setIsLoadingMoreNews(false);
      }
    });
  };

  // console.log( resultData?.nodes.length === 0)

  return (
    <>
      <Headview
        title={`Search results for ${query} | WrestlingWorld`}
        description="Latest wwe news, rumours, results with videos clips and feeds make your mind goo crazy!"
        keywords="Wrestling, News and Rumors,WWE and AEW"
      />
      <Layout QuotesData={QuotesData}>
        <div className="Search__wraper  flex justify-center items-start my-5 mx-3">
          <SinglePostAds>
            <div className=" w-full md:w-[600px] xl:w-[630px] ">
              <SearchBar />
              <div className="py-5">
                <h6 className="cate33 text-xs font-normal uppercase text-gray-400 text-center">
                  SHOWING RESULTS FOR:
                </h6>
                <h1 className="category_Name_display text-4xl font-black uppercase text-center">
                  {query}
                </h1>
              </div>
              {postsData?.map((item) => {
                return <NewsItem key={item?.id} item={item} />;
              })}

              {isLoadingMoreNews ? (
                <div className="mt-8 flex justify-center items-center">
                  <LoadingSpinner />
                </div>
              ) : resultData?.nodes.length === 0 ? (
                <h1 className="text-center text-[22px] font-normal py-10">
                  No search result found!
                </h1>
              ) : (
                <button
                  onClick={handleLoadMoreNews}
                  className="mb-5 uppercase w-fit flex justify-center items-center mt-8 mx-auto hover:bg-[#ce061e] hover:text-[#fff] hover:border-[#ce061e] rounded-sm md:rounded-md text-[#767676] pt-1 pb-0.5 md:pt-2 md:pb-1 font-khand-headers border px-4 border-[#767676] font-semibold text-[10px] md:text-[13px]"
                >
                  Load more
                </button>
              )}
            </div>
          </SinglePostAds>
        </div>
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  const query = context.query.q;
  const { data } = await client.query({
    query: SEARCH_ARTICELS,
    variables: {
      query,
    },
  });
  const resQuotes = await fetch(
    `https://api.wrestlingworld.co/wp-json/jet-cct/wrestling_quotes/?_order=asc`
  );
  const QuotesData = await resQuotes.json();
  return {
    props: {
      query,
      resultData: data.posts,
      QuotesData,
    },
  };
}
