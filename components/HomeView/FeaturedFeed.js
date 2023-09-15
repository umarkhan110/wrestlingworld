import Link from "next/link";

export default function FeaturedFeedOne({ FeaturedData }) {

 

  const FeData = FeaturedData[0]

  // console.log()
  // console.log(FeData)
  
  return (
    <>
   <Link href={
        `/${FeData?.categories?.edges?.find((i) => i?.isPrimary === true).node?.slug}/${FeData?.slug}`
        
        } >
      <a >
        <div style={{ backgroundImage: `url(${FeData?.featuredImage.node.sourceUrl})`}} className=" rounded mt-6 mb-0 FeaturedFeed__wraper   relative h-[280px] sm:h-[350px] xl:h-[400px] w-full">
          <h1 className="text-left w-full sm:text-center leading-[28px] line-clamp-3 z-10  Featured__title  absolute dark:text-white text-white bottom-1 pr-10 pb-0 md:pb-3 pl-4 text-[26px] md:text-[28px] font-semibold">
            {FeData?.title}</h1>
        </div>
      </a>
    </Link>
    </>
    
  )
}
