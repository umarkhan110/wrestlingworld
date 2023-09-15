import Image from 'next/image'
import Link from 'next/link'

export default function FooterNewsItem({ item }) {
    return (
        <>
            <div className="Footer__news__wraper shadow-postLight dark:shadow rounded overflow-hidden bg-white p-3  dark:bg-[#191919] h-[350px]">
                <Image
                className='!w-full h-full'
                    src={item?.featuredImage?.node?.sourceUrl}
                    width="400"
                    height="200"
                    alt={item?.title}
                />
                <div className='Footer__news_info py-2 px-2 '>
                    <Link href={`/${item?.categories?.edges?.find((i) => i?.isPrimary === true).node?.slug}/${item?.slug}`}>

                        <a className=' line-clamp-3 footer_news_title text-[18px] md:text-[20px] leading-6 capitalize font-semibold'>{item?.title}</a>

                    </Link>
                    <div className='text-xs pt-3 line-clamp-2' dangerouslySetInnerHTML={{__html: `${item?.excerpt}`}} />
                </div>
            </div>
        </>
    )
}
