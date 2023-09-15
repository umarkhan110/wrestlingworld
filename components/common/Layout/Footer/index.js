import Image from 'next/image'
import Link from 'next/link'
import { IoLogoFacebook } from "react-icons/io5";
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"

export default function Footer({ QuotesData }) {

    const d = new Date();
    let year = d.getFullYear();

 

    const [sliderRef] = useKeenSlider({
        loop: true,
        slides: {
          origin: "center",
          perView: 1,
          spacing: 0,
        },
        vertical: true,  
      },
      [
        (slider) => {
          let timeout
          let mouseOver = false
          function clearNextTimeout() {
            clearTimeout(timeout)
          }
          function nextTimeout() {
            clearTimeout(timeout)
            if (mouseOver) return
            timeout = setTimeout(() => {
              slider.next()
            }, 5000)
          }
          slider.on("created", () => {
            slider.container.addEventListener("mouseover", () => {
              mouseOver = true
              clearNextTimeout()
            })
            slider.container.addEventListener("mouseout", () => {
              mouseOver = false
              nextTimeout()
            })
            nextTimeout()
          })
          slider.on("dragStarted", clearNextTimeout)
          slider.on("animationEnded", nextTimeout)
          slider.on("updated", nextTimeout)
        },
      ]
      )

      // console.log(QuotesData)
 
    return (
        <div className='footer__wraper relative z-[6] text-center pt-10 pl-0 xl:pl-5 dark:bg-[#191919] bg-white text-[#16151a]  dark:text-white'>
            <Image src="/ww-star-272x90.png" width="180px" height="60px" alt="logo" />
            <div ref={sliderRef} className="keen-slider h-[60px] pt-2 mb-5 mt-2 overflow-hidden">
                {
                    QuotesData?.map((item, idx) => {
                        return(
                            <div
                            key={idx}
                            className="keen-slider__slide number-slide1"
                          > 
                            <p className="dark:text-[#a9a9a9] text-base font-medium  w-full ">{item?.wrestling_quotes_text}</p>
                            <p className="dark:text-[#a9a9a9] text-sm font-medium w-full pt-2"> - {item?.wrestling_quotes_wrestler}</p>
                          </div>
                        )
                    })
                }
            </div>
      

            <Link href="https://www.facebook.com/wrestlingworld">
                <a className='flex justify-center items-center'>
                    <IoLogoFacebook className='w-8 h-8' />
                </a>
            </Link>

            <div className='font_oswald w-full bottom__footer md:flex md:justify-between dark:border-black border-t py-5 mt-10 md:items-center px-0 md:px-5'>
                <p className='md:pb-0 text-[#666666]  pb-3 text-sm font-normal'>
                    Copyright © {year} <Link href="/"><a>WrestlingWorld</a></Link>
                </p>
                <ul className='text-[#191919]  dark:text-[#666666] text-sm font-normal flex justify-center md:justify-end items-center'>
                    <li className='pr-5'>
                        <Link href="/about-us"><a target="_blank" className=' uppercase'>About us</a></Link>
                    </li>
                    <li className='pr-5'>
                        <Link href="/privacy-policy"><a target="_blank" className='uppercase'>privacy policy</a></Link>
                    </li>
                    <li>
                        <Link href="/contact-us"><a target="_blank" className=' uppercase '>contact us</a></Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}
