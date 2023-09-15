import client from "../components/ApolloClient";

import { useState, useEffect } from "react";

import { request } from "graphql-request";
import {
  GET_SEO_PAGE,
  COMPANIES,
  SHOWS,
  FEATURED_ARTICLES,
  RESULTS,
  VIDEO_PLAYLIST,
  NEWS_ARTICLES,
  RUMORS_ARTICLES,
  FOOTER_NEWS_ARTICLES,
  LOAD_MORE_NEWS_ARTICLES,
} from "../components/Services/Query";
import LoadingSpinner from "../components/common/LoadingSpinner";

import dynamic from "next/dynamic";
const SearchBar = dynamic(
  () => import("../components/common/Layout/searchBar"),
  {
    ssr: false,
  }
);
const Headview = dynamic(() => import("../components/common/Head"));

const VideoPlayer = dynamic(() =>
  import("../components/HomeView/VideoPlaylist")
);
const FeaturedFeed = dynamic(() =>
  import("../components/HomeView/FeaturedFeed")
);
const Layout = dynamic(() => import("../components/common/Layout"));
const Results = dynamic(() => import("../components/HomeView/Results"));
const Advertisements = dynamic(() =>
  import("../components/HomeView/Advertisements")
);
const PPVEeventList = dynamic(() =>
  import("../components/HomeView/PPVEeventList")
);
const FooterNews = dynamic(() => import("../components/common/FooterNews"));
const NewsItem = dynamic(() => import("../components/common/NewsItem"));
export default function Home({
  SeoData,
  EventHomeList,
  CompaniesData,
  ShowsData,
  ResultsData,
  VideoListsData,
  NewsData,
  FeaturedData,
  FooterNewsData,
  QuotesData,
}) {
  const cursorId = NewsData?.pageInfo.endCursor;
  const NewNewsData = NewsData.nodes;

  const [newsAndRumorsData, setNewsAndRumorsData] = useState([...NewNewsData]);
  const [isLoadingMoreNews, setIsLoadingMoreNews] = useState(false);
  const [hasNextCursor, setHasNextCursor] = useState(null);
  const [senitizeFeedData, setSenitizeFeedData] = useState([]);

  useEffect(() => {
    function removeObjectWithId(arr, id) {
      const objWithIdIndex = arr.findIndex((obj) => obj.id === id);

      if (objWithIdIndex > -1) {
        arr.splice(objWithIdIndex, 1);
      }

      setSenitizeFeedData([...arr]);
    }
    removeObjectWithId(newsAndRumorsData, FeaturedData[0]?.id);
  }, [newsAndRumorsData, FeaturedData]);

  // console.log(arr)

  const variable = {
    after: hasNextCursor || cursorId,
  };

  const handleLoadMoreNews = () => {
    // if (!newsAndRumorsData) return;
    setIsLoadingMoreNews(true);
    request(
      "https://api.wrestlingworld.co/graphql",
      LOAD_MORE_NEWS_ARTICLES,
      variable
    ).then((data) => {
      if (data) {
        setNewsAndRumorsData([...newsAndRumorsData, ...data.posts.nodes]);
        setHasNextCursor(data?.posts?.pageInfo?.endCursor);
        setIsLoadingMoreNews(false);
      }
    });
  };

  return (
    <>
      <Headview
        title={SeoData?.title}
        description={SeoData?.metaDesc}
        keywords={SeoData?.metaKeywords}
        Image={SeoData?.opengraphImage?.sourceUrl}
      >
        {SeoData?.fullHead}{" "}
      </Headview>
      <Layout QuotesData={QuotesData}>
        <div className="main_home_container w-full pl-[10px] pr-[10px] xl:pl-10 lg:pr-5 lg:flex  items-start">
          <div className="pr-0 lg:pr-5 left__contaciner w-full lg:w-[65%] xl:w-[50%] ">
            <div>
              <SearchBar />
            </div>
            <FeaturedFeed FeaturedData={FeaturedData} />
            <>
              {senitizeFeedData?.length > 1
                ? senitizeFeedData?.map((item, idx) => {
                    return <NewsItem key={idx} item={item} isLoading={false} />;
                  })
                : new Array(12)
                    .fill("1")
                    .map((x, i) => <NewsItem key={i} isLoading />)}

              {isLoadingMoreNews ? (
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
              )}
            </>
          </div>
          <div className="right__contaciner w-full lg:w-[35%] xl:w-[50%]  ">
            <Results
              CompaniesData={CompaniesData}
              ShowsData={ShowsData}
              ResultsData={ResultsData}
            />
            <Advertisements />
            <VideoPlayer VideoListsData={VideoListsData} />
            {/* <PhotoGallary GallaryPhoto={GallaryPhoto} /> */}
            <PPVEeventList EventHomeList={EventHomeList} />
          </div>
        </div>
        {/* <FooterTextSLider QuotesData={QuotesData} /> */}
        <div className="all_bg dark:bg-[#191919] xl:pl-10 pb-5 lg:mt-5 mt-0">
          <FooterNews FooterNewsData={FooterNewsData} />
        </div>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const resCompanies = await client.query({ query: COMPANIES });
  const resShows = await client.query({ query: SHOWS });
  const resResults = await client.query({ query: RESULTS });
  const resVideoList = await client.query({ query: VIDEO_PLAYLIST });
  const resNews = await client.query({ query: NEWS_ARTICLES });
  const resFeatured = await client.query({ query: FEATURED_ARTICLES });
  const resFooterNews = await client.query({ query: FOOTER_NEWS_ARTICLES });
  const resSeo = await client.query({
    query: GET_SEO_PAGE,
    variables: { id: 27920 },
  });

  const res = await fetch(
    `https://api.wrestlingworld.co/wp-json/jet-cct/events_list/?_orderby=events_list_date&_order=asc`
  );
  const eventData = await res.json();

  const resQuotes = await fetch(
    `https://api.wrestlingworld.co/wp-json/jet-cct/wrestling_quotes/?_order=asc`
  );
  const QuotesData = await resQuotes.json();

  // https://api.wrestlingworld.co/wp-json/jet-cct/event_schedule/?_orderby=_date_event&_order=asc&cct_status=publish
  return {
    props: {
      CompaniesData: resCompanies.data.companies.nodes || null,
      ShowsData: resShows.data.showsCompanies.nodes || null,
      ResultsData: resResults.data.quickResults.nodes || null,
      VideoListsData: resVideoList.data.videoPlaylists.nodes || null,
      NewsData: resNews.data.posts || null,
      FeaturedData: resFeatured.data.posts.nodes || null,
      FooterNewsData: resFooterNews.data.posts.nodes || null,
      EventHomeList: eventData || null,
      SeoData: resSeo?.data?.page?.seo,
      QuotesData,
    },
    revalidate: 10,
  };
}
