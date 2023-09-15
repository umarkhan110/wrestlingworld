import React, { useState } from "react"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import Image from 'next/image'


const PhotoSlider = (props) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    },
  })

  const { GallaryPhoto, handleClick} = props;


  return (
    <>
      <div className="navigation-wrapper relative ml-0 md:mt-0 mt-5 md:ml-2">
        <div ref={sliderRef} className="keen-slider rounded-lg py-10 bg-black">
          {
            GallaryPhoto?.map((item, index) => {
              return (
                <div key={index} onClick={() => handleClick(item, index)} className=" cursor-pointer keen-slider__slide text-center">
                  <h1 className="text-white text-lg uppercase font-black pb-4 font-sans">{
                    `Photo Drop ${item?._name}`
                  }</h1>
                  <Image src={item?._image_link} width="260px" height="260px" alt={item._name} />
                </div>

              )
            })
          }

        </div>
        {loaded && instanceRef.current && (
          <>
            <Arrow
              left
              onClick={(e) =>
                e.stopPropagation() || instanceRef.current?.prev()
              }
              disabled={currentSlide === 0}
            />

            <Arrow
              onClick={(e) =>
                e.stopPropagation() || instanceRef.current?.next()
              }
              disabled={
                currentSlide ===
                instanceRef.current.track.details.slides.length - 1
              }
            />
          </>
        )}
      </div>

    </>
  )
}


export default PhotoSlider;

function Arrow(props) {
  const disabeld = props.disabled ? " arrow--disabled" : ""
  return (
    <svg
      onClick={props.onClick}
      className={`text-white w-5 h-5 absolute arrow ${props.left ? "arrow--left left-0 top-[50%]" : "arrow--right right-0 top-[50%]"
        } ${disabeld}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      {props.left && (
        <path
          fillRule="evenodd"
          d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
          clipRule="evenodd"
        />
      )}
      {!props.left && (
        <path
          fillRule="evenodd"
          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      )}
    </svg>
  )
}
