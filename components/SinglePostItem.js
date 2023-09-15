import moment from "moment";
import Image from 'next/image';
import '@wordpress/block-library/build-style/common.css'
import '@wordpress/block-library/build-style/theme.css'
import '@wordpress/block-library/build-style/style.css'
import { FiArrowUpRight } from "react-icons/fi";
import { FaFacebookF, FaPinterestP, FaTwitter, FaRedditAlien, FaWhatsapp, FaTumblr, FaTelegramPlane } from "react-icons/fa";
import {
  FacebookShareButton,
  PinterestShareButton,
  TwitterShareButton,
  RedditShareButton,
  WhatsappShareButton,
  TumblrShareButton,
  TelegramShareButton,
} from 'next-share';

import { FaShareSquare } from "react-icons/fa";
import Link from "next/link";
import { useEffect, useState } from "react";
import '@wordpress/block-library/build-style/common.css'
import '@wordpress/block-library/build-style/theme.css'
import '@wordpress/block-library/build-style/style.css'

import SinglePostItemTwo from "./SinglePostItemTwo";
import AdsData, { generateDesktopAdHTML, generateMobileAdHTML } from "../AdsData";

export default function SinglePostItem({ postData, slug, slugCategory }) {

  const [formattedMarkup, setFormattedMarkup] = useState('')
  const createMarkup = () => {
    return { __html: postData?.content };
  }

  useEffect(() => {
    const script = document.createElement("script");
    script.id = "instagram-embed";
    script.src = "//www.instagram.com/embed.js";
    script.defer = true;
    document.head.appendChild(script);

    return () => {
      script.remove();
      // Remove the property added by the IG embed script
      // so the embed will work again on re-mount.
      if (window.instgrm) delete window.instgrm;
    };

  });


  useEffect(() => {
    if (window.twttr) {
      window.twttr.widgets.load();
    }
    if (postData?.content) {
      const parser = new DOMParser();
      let content = "<body>" + postData.content.replaceAll("\n", '') + "</body>"
      const doc = parser.parseFromString(content, "text/html");
      if (slugCategory === 'news' || slugCategory === 'rumors') {
        if (doc.body.children.length >= 4) {

          let news_elements = doc.body.children
          let desktop_ad_element_1 = generateDesktopAdHTML('ww_a_300v_3')
          let desktop_ad_element_2 = generateDesktopAdHTML('ww_a_300v_4')

          let mobile_ad_element_1 = generateMobileAdHTML('ww_mob_a_1')
          let mobile_ad_element_2 = generateMobileAdHTML('ww_mob_a_2')

          let len = news_elements.length
          let no_of_desktop_inserted = 0
          let no_of_mobile_insert = 0
          for (let i = 0; i < len; i++) {

            if (i >= 2 && i % 2 === 0) {
              const element = news_elements.item(i + no_of_desktop_inserted + no_of_mobile_insert);
              //* Adding ad after second element
              if (i === 2) {
                element.insertAdjacentHTML('beforebegin', desktop_ad_element_1);
              } else {
                //* Adding ad element after every second element staring from 4th element
                element.insertAdjacentHTML('beforebegin', desktop_ad_element_2);
              }
              no_of_desktop_inserted++;
            }
            //* Adding ad mobile after every second element.
            if (i >= 2 && i % 2 === 0) {
              const element = news_elements.item(i + no_of_desktop_inserted + no_of_mobile_insert);
              no_of_mobile_insert++
              element.insertAdjacentHTML('beforebegin', mobile_ad_element_2)
            }
          }
          //* Adding mobile ad before first element.
          news_elements.item(0).insertAdjacentHTML('beforebegin', mobile_ad_element_1)

          setFormattedMarkup(doc.body.innerHTML)
          return;
        }
      } else {
        //* showing Ad after before h2 tags.
        let h2Elements = doc.body.querySelectorAll('h2')
        let mobile_ad = generateMobileAdHTML('ww_mob_g_1')
        let desktop_ad_element_1 = generateDesktopAdHTML('ww_g_300v_1')
        let desktop_ad_element_2 = generateDesktopAdHTML('ww_g_300v_2')
        let ads_container = `
          <table style="border-collapse: collapse; width: 100%; height: 33px; border: 0px;">
            <tbody>
            <tr style="height: 18px; border: 0px;">
              <td style="width: 50%; text-align: center; height: 18px; border: 0px; padding: 2px;">
                ${desktop_ad_element_1}
              </td>
              <td style="width: 50%; text-align: center; height: 18px; border: 0px; padding: 2px;">
              ${desktop_ad_element_2}
              </td>
              <td>
              ${mobile_ad}
              </td>
            </tr>
          
          </tbody>
        </table>
          `
        h2Elements.forEach(h2 => {
          h2.insertAdjacentHTML('beforebegin', ads_container);
        });
        setFormattedMarkup(doc.body.innerHTML)
        return;
      }

      setFormattedMarkup(postData.content)

    }

  }, [postData]);

  const postContentArray = postData?.content?.split('<!--nextpage-->');

  return (
    <div className='w-full mb-10 shadow-postLight  dark:shadow dark:bg-[#171717] p-2 md:p-5 sm:rounded-lg bg-white'>
      <h1 className=' leading-[30px] text-[26px] md:text-[32px] font-bold pb-2'>{postData?.title}</h1>
      <div className='pb-6 text-xs font-normal'>
        by <span className=' font-semibold'>
          <Link href={`/author/${postData?.author?.node?.name}`}>
            <a> {postData?.author?.node?.name}</a>
          </Link>
        </span>
        <span className='pl-5'>{moment(postData?.date).format("MMMM D Y")}</span>
      </div>

      <div className='pb-2'>
        {
          postData?.featuredImage?.node?.mediaItemUrl ?
            <Image src={postData?.featuredImage?.node?.mediaItemUrl} width="696" height="392" alt={postData?.title} />
            : <Image src={`/wrestling-ring.jpg`} width="696" height="392" alt={postData?.title} />

        }
        {
          postData?.featuredImage?.node?.caption ?
            <div className="text-[12px] text-[#222] dark:text-[#ccc]"
              dangerouslySetInnerHTML={{ __html: `${postData?.featuredImage?.node?.caption}` }} />
            : null
        }

      </div>
      <div className=" flex justify-center items-center">
        <ul className='share__btns flex justify-start items-center my-5 px-2 pt-3 pb-1 rounded dark:shadow-[0_3px_35px_-15px_rgba(0,0,0,1)] shadow-postLight'>
          <button className='mr-3 uppercase  py-1 px-3 flex justify-start items-center'>
            <span><FaShareSquare className="w-4 h-4 text-[#6d6d6d] dark:text-[#d0d0d0]" /></span> <span className=' pl-2 text-base font-normal'>Share</span>
          </button>
          <li className="pr-5">

            <FacebookShareButton
              url={`https://wrestlingworld.co/${slugCategory}/${slug}`}
              title={postData?.title}
            >
              <FaFacebookF className="dark:opacity-100 dark:hover:text-[#1977F3] w-5 h-5 text-[#1977F3] opacity-70 hover:opacity-100 hover:scale-110" />
            </FacebookShareButton>
          </li>

          <li className="pr-5">

            <PinterestShareButton
              url={`https://wrestlingworld.co/${slugCategory}/${slug}`}
              title={postData?.title}
            >
              <FaPinterestP className=" dark:opacity-100 dark:hover:text-[#B7081B]  w-5 h-5 text-[#B7081B] opacity-70 hover:opacity-100 hover:scale-110" />
            </PinterestShareButton>

          </li>

          <li className="pr-5">

            <TwitterShareButton
              url={`https://wrestlingworld.co/${slugCategory}/${slug}`}
              title={postData?.title}
            >
              <FaTwitter className=" dark:opacity-100 dark:hover:text-[#1A8CD8] text-[#1A8CD8] opacity-70 hover:opacity-100 hover:scale-110 w-5 h-5" />
            </TwitterShareButton>
          </li>

          <li className="pr-5">
            <RedditShareButton
              url={`https://wrestlingworld.co/${slugCategory}/${slug}`}
              title={postData?.title}
            >
              <FaRedditAlien className=" dark:opacity-100 dark:hover:text-[#F84A03] w-5 h-5 text-[#F84A03] opacity-70 hover:opacity-100 hover:scale-110" />
            </RedditShareButton>
          </li>
          <li className="pr-5">
            <WhatsappShareButton
              url={`https://wrestlingworld.co/${slugCategory}/${slug}`}
              title={postData?.title}
            >
              <FaWhatsapp className=" dark:opacity-100 dark:hover:text-[#4AAA4E] w-5 h-5 text-[#4AAA4E] opacity-70 hover:opacity-100 hover:scale-110" />
            </WhatsappShareButton>
          </li>
          <li className="pr-5">
            <TumblrShareButton
              url={`https://wrestlingworld.co/${slugCategory}/${slug}`}
              title={postData?.title}
            >
              <FaTumblr className=" dark:opacity-100 dark:hover:text-[#2995c7] w-5 h-5 text-[#2995c7] opacity-70 hover:opacity-100 hover:scale-110" />
            </TumblrShareButton>
          </li>
          <li className="pr-5">
            <TelegramShareButton
              url={`https://wrestlingworld.co/${slugCategory}/${slug}`}
              title={postData?.title}
            >
              <FaTelegramPlane className=" dark:opacity-100 dark:hover:text-[#2E9FD4] w-5 h-5 text-[#2E9FD4] opacity-70 hover:opacity-100 hover:scale-110" />
            </TelegramShareButton>
          </li>
        </ul>
      </div>
      {
        postContentArray && postContentArray.length > 1 ? (
          <SinglePostItemTwo uri={postData?.uri} postContentArray={postContentArray} />
        ) : (
          <div className='font_nunito text-[#222] dark:text-[#ccc] conetnt_blog px-[10px] lg:px-0   text-[18px] font-normal leading-8' dangerouslySetInnerHTML={{ __html: formattedMarkup }} />
        )
      }

      {
        postData?.sourcelinkfileds?.sourceLink ? (

          <div className="">
            <Link href={postData?.sourcelinkfileds?.sourceLink}>
              <a target="_blank" className=" rounded pr-2 w-full py-2 text-center text-[19px] md:text-[20px] flex justify-center items-center uppercase bg-black text-white mb-5 mt-0">
                {postData?.sourcelinkfileds?.sourceLabel}
                <span>
                  <FiArrowUpRight className="w-6 h-6 text-white" />
                </span>
              </a>
            </Link>

          </div>

        ) : null
      }

      <div className=" flex justify-center items-center">
        <ul className='share__btns flex justify-start items-center mb-3 mt-0 px-2 pt-3 pb-1 rounded dark:shadow-[0_3px_35px_-15px_rgba(0,0,0,1)] shadow-postLight'>
          <button className='mr-3 uppercase  py-1 px-3 flex justify-start items-center'>
            <span><FaShareSquare className="w-4 h-4 text-[#6d6d6d] dark:text-[#d0d0d0]" /></span> <span className=' pl-2 text-base font-normal'>Share</span>
          </button>
          <li className="pr-5">

            <FacebookShareButton
              url={`https://wrestlingworld.co/${slugCategory}/${slug}`}
              title={postData?.title}
            >
              <FaFacebookF className="dark:opacity-100 dark:hover:text-[#1977F3] w-5 h-5 text-[#1977F3] opacity-70 hover:opacity-100 hover:scale-110" />
            </FacebookShareButton>
          </li>

          <li className="pr-5">

            <PinterestShareButton
              url={`https://wrestlingworld.co/${slugCategory}/${slug}`}
              title={postData?.title}
            >
              <FaPinterestP className=" dark:opacity-100 dark:hover:text-[#B7081B]  w-5 h-5 text-[#B7081B] opacity-70 hover:opacity-100 hover:scale-110" />
            </PinterestShareButton>

          </li>

          <li className="pr-5">

            <TwitterShareButton
              url={`https://wrestlingworld.co/${slugCategory}/${slug}`}
              title={postData?.title}
            >
              <FaTwitter className=" dark:opacity-100 dark:hover:text-[#1A8CD8] text-[#1A8CD8] opacity-70 hover:opacity-100 hover:scale-110 w-5 h-5" />
            </TwitterShareButton>
          </li>

          <li className="pr-5">
            <RedditShareButton
              url={`https://wrestlingworld.co/${slugCategory}/${slug}`}
              title={postData?.title}
            >
              <FaRedditAlien className=" dark:opacity-100 dark:hover:text-[#F84A03] w-5 h-5 text-[#F84A03] opacity-70 hover:opacity-100 hover:scale-110" />
            </RedditShareButton>
          </li>
          <li className="pr-5">
            <WhatsappShareButton
              url={`https://wrestlingworld.co/${slugCategory}/${slug}`}
              title={postData?.title}
            >
              <FaWhatsapp className=" dark:opacity-100 dark:hover:text-[#4AAA4E] w-5 h-5 text-[#4AAA4E] opacity-70 hover:opacity-100 hover:scale-110" />
            </WhatsappShareButton>
          </li>
          <li className="pr-5">
            <TumblrShareButton
              url={`https://wrestlingworld.co/${slugCategory}/${slug}`}
              title={postData?.title}
            >
              <FaTumblr className=" dark:opacity-100 dark:hover:text-[#2995c7] w-5 h-5 text-[#2995c7] opacity-70 hover:opacity-100 hover:scale-110" />
            </TumblrShareButton>
          </li>
          <li className="pr-5">
            <TelegramShareButton
              url={`https://wrestlingworld.co/${slugCategory}/${slug}`}
              title={postData?.title}
            >
              <FaTelegramPlane className=" dark:opacity-100 dark:hover:text-[#2E9FD4] w-5 h-5 text-[#2E9FD4] opacity-70 hover:opacity-100 hover:scale-110" />
            </TelegramShareButton>
          </li>
        </ul>
      </div>
    </div>
  )
}
