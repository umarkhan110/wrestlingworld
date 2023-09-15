import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import FooterNewsItem from "./FooterNewsItem"
import { useState } from "react"
export default function FooterNews({ FooterNewsData }) {
  const [loaded, setLoaded] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)


  const [sliderRef, instanceRef] = useKeenSlider({
    created() {
      setLoaded(true)
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    breakpoints: {
      "(min-width: 400px)": {
        slides: { perView: 2, spacing: 10 },
      },
      "(min-width: 1000px)": {
        slides: { perView: 4, spacing: 20 },
      },
    },
    slides: { perView: 1 },
  })


  return (
    <div className="Footer_News_wraper  mx-5 relative">
      <div ref={sliderRef} className="keen-slider">
        {
          FooterNewsData?.map((item) => {
            return (
              <div key={item?.id} className=" shadow-postLight dark:shadow-xl rounded-[4px] my-5 keen-slider__slide number-slide1">
                <FooterNewsItem item={item} />
              </div>
            )
          })
        }
      </div>

      {loaded && instanceRef.current && (
        <>
          <button className=" absolute left-0 top-[30%] shadow mr-5 dark:bg-[#212121] hover:bg-gray-200 w-20 h-20 bg-[#ffffff64] rounded-full flex justify-center items-center">
            <Arrow
              left
              onClick={(e) =>
                e.stopPropagation() || instanceRef.current?.prev()
              }
              disabled={currentSlide === 0}
            />
          </button>

          <button className=" absolute right-0 top-[30%] shadow dark:bg-[#212121] hover:bg-gray-200  w-20 h-20 bg-[#ffffff64] rounded-full flex justify-center items-center">
            <Arrow
              onClick={(e) =>
                e.stopPropagation() || instanceRef.current?.next()
              }
              disabled={
                currentSlide ===
                instanceRef.current.track.details.slides.length - 1
              }
            />
          </button>
        </>
      )}

    </div>
  )
}




function Arrow(props) {
  const disabeld = props.disabled ? " arrow--disabled" : ""
  return (
    <svg
      onClick={props.onClick}
      className={`w-8 h-8 text-[#212121] dark:text-[#f1f1f1] cursor-pointer arrow ${props.left ? "arrow--left" : "arrow--right"
        } ${disabeld}`}
      xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
    >
      {props.left && (
        <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="48" d="M328 112L184 256l144 144" />
      )}
      {!props.left && (
        <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="48" d="M184 112l144 144-144 144" />
      )}
    </svg>
  )
}
