import client from "../components/ApolloClient";
import { GET_EVENTS } from "../components/Services/Query";
import { useState } from "react";
import dynamic from "next/dynamic";
const SinglePostAds = dynamic(() =>
  import("../components/common/AdTemplates/SinglePostAds")
);
const Headview = dynamic(() => import("../components/common/Head"));
const SinglePageLayout = dynamic(() =>
  import("../components/common/Layout/SinglePageLayout")
);
const EventsMaths = dynamic(() => import("../components/EventsMatchs"));
const adsData = dynamic(() => import("../AdsData"));

export default function PPVScheduleMatchCard({ QuotesData, EventData }) {
  const [seletedCompany, setSelectedCompany] = useState("All");
  // console.log(EventData)

  return (
    <>
      <Headview
        title={`PPV schedule & match cards | WrestlingWorld`}
        description="Latest wwe news, rumours, results with videos clips and feeds make your mind goo crazy!"
        keywords="Wrestling, News and Rumors,WWE and AEW"
      />
      <SinglePageLayout QuotesData={QuotesData}>
        <div className="py-5 mt-14 relative dark:text-white text-black  flex justify-center items-start">
          <SinglePostAds
            adLeftID={adsData?.leftID}
            adRightID={adsData?.rightID}
          >
            <div className="w-full md:w-[600px] xl:w-[630px]">
              <h1 className="text-[28px] md:text-[36px] font-[700] text-center uppercase">
                ppv schedule & match card
              </h1>
              <p className=" font_nunito text-[16px] px-2 md:text-[17px] font-normal text-center py-5">
                Check out the complete WWE, AEW, Impact, and NJPW Pay Per View
                schedule and the updated match card for each event for the year
                2023-2024
              </p>
              <div className="my-6 flex justify-center items-center">
                <div
                  className={`text-[16px] cursor-pointer font-medium uppercase px-3 py-2 dark:bg-[#191919] dark:text-white  bg-white  text-black ${
                    "All" === seletedCompany &&
                    `!bg-[#ce061e] rounded !text-white`
                  }`}
                  onClick={() => setSelectedCompany("All")}
                >
                  All
                </div>
                <div
                  className={`text-[16px] cursor-pointer font-medium uppercase px-3 py-2 dark:bg-[#191919] dark:text-white  bg-white  text-black ${
                    "WWE" === seletedCompany &&
                    `!bg-[#ce061e] rounded !text-white`
                  }`}
                  onClick={() => setSelectedCompany("WWE")}
                >
                  wwe
                </div>
                <div
                  className={`text-[16px] cursor-pointer font-medium uppercase px-3 py-2 dark:bg-[#191919] dark:text-white  bg-white  text-black ${
                    "AEW" === seletedCompany &&
                    `!bg-[#ce061e] rounded !text-white`
                  }`}
                  onClick={() => setSelectedCompany("AEW")}
                >
                  AEW
                </div>
                <div
                  className={`text-[16px] cursor-pointer font-medium uppercase px-3 py-2 dark:bg-[#191919] dark:text-white  bg-white  text-black ${
                    "IMPACT" === seletedCompany &&
                    `!bg-[#ce061e] rounded !text-white`
                  }`}
                  onClick={() => setSelectedCompany("IMPACT")}
                >
                  IMPACT
                </div>
                <div
                  className={`text-[16px] cursor-pointer font-medium uppercase px-3 py-2 dark:bg-[#191919] dark:text-white  bg-white  text-black mr-2 ${
                    "NJPW" === seletedCompany &&
                    `!bg-[#ce061e] rounded !text-white`
                  }`}
                  onClick={() => setSelectedCompany("NJPW")}
                >
                  NJPW
                </div>
              </div>
              <EventsMaths seletedCompany={seletedCompany} events={EventData} />
            </div>
          </SinglePostAds>
        </div>
      </SinglePageLayout>
    </>
  );
}

export async function getServerSideProps() {
  const res = await client.query({ query: GET_EVENTS });

  const resQuotes = await fetch(
    `https://api.wrestlingworld.co/wp-json/jet-cct/wrestling_quotes/?_order=asc`
  );
  const QuotesData = await resQuotes.json();

  const resEvent = await fetch(
    `https://api.wrestlingworld.co/wp-json/jet-cct/event_schedule/?_orderby=_date_event&_order=asc&type_event=ppv&cct_status=publish`
  );
  const EventData = await resEvent.json();

  if (!res) {
    return {
      notFound: true,
    };
  }

  return {
    props: { events: res?.data?.eventSchedules?.nodes, QuotesData, EventData }, // will be passed to the page component as props
  };
}
