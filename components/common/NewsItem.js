import Link from "next/link";
import moment from "moment";
import LoadingSkeleton from "./LoadingSkeleton";

export default function NewsItem({ item, isLoading, category }) {
  // console.log(item?.categories?.edges?.find((i) => i?.isPrimary === true).node?.name)
  return (
    <div className="shadow-postLight dark:shadow-lg flex justify-between items-center w-full News_item_wraper  dark:bg-[#191919] all_bg  rounded-[4px] p-2 mt-[8px] ">
      {!isLoading ? (
        <div
          style={{
            backgroundImage: `url(${item?.featuredImage?.node?.sourceUrl})`,
          }}
          className="Image_wraper w-[35%] h-[90px] py-2 sm:h-[140px] 2xl:h-[130px] bg-cover bg-bottom rounded-[4px]  col-span-3 sm:col-span-2"
        ></div>
      ) : (
        <LoadingSkeleton className="inset-0" />
      )}

      <div className=" w-[65%] content_wraper pl-2 sm:pl-4  overflow-hidden">
        {!isLoading && item?.categories?.edges ? (
          <h6 className="font-normal pb-1 md:text-[13px] text-[10px] uppercase text-gray-600">
            {
              item?.categories?.edges?.find((i) => i?.isPrimary === true).node
                ?.name
            }
          </h6>
        ) : (
          <LoadingSkeleton width={60} height={20} />
        )}
        {/* `/${item?.categories?.nodes[0]?.slug}/${item?.slug}` */}
        {!isLoading && item?.title ? (
          <Link
            href={`/${
              item?.categories?.edges?.find((i) => i?.isPrimary === true).node
                ?.slug
            }/${item?.slug}`}
          >
            <a>
              <h1 className="news__title leading-[19px] sm:leading-[22px] text-[18px] sm:text-[22px] font-semibold  ">
                {item?.title}
              </h1>
            </a>
          </Link>
        ) : (
          <LoadingSkeleton />
        )}

        <div className="pt-1 md:text-[13px] 2xl:first-letter:text-clip text-[10px] font-normal text-gray-600">
          {!isLoading && item?.date ? (
            <span> {moment(item?.date).format("MMMM D Y")}</span>
          ) : (
            <LoadingSkeleton count={2} />
          )}
        </div>
      </div>
    </div>
  );
}
