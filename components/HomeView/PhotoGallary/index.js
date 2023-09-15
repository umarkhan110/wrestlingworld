import PhotoGallaryAds from "./PhotoGallaryAds";
import PhotoSlider from "./PhotoSlider";
import { useState } from 'react';
import LightBox from "../../LightBox"


export default function PhotoGallary({GallaryPhoto}) {

  const [clickedImg, setClickedImg] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);


  const handleClick = (item, index) => {
    setCurrentIndex(index);
    setClickedImg(item?._image_link);
  };

  const handelRotationRight = () => {
    const totalLength = data?.length;
    if (currentIndex + 1 >= totalLength) {
      setCurrentIndex(0);
      const newUrl = data[0]._image_link;
      setClickedImg(newUrl);
      return;
    }
    const newIndex = currentIndex + 1;
    const newUrl = data.filter((item) => {
      return data.indexOf(item) === newIndex;
    });
    const newItem = newUrl[0]._image_link;
    setClickedImg(newItem);
    setCurrentIndex(newIndex);
  };

  const handelRotationLeft = () => {
    const totalLength = data?.length;
    if (currentIndex === 0) {
      setCurrentIndex(totalLength - 1);
      const newUrl = data[totalLength - 1]._image_link;
      setClickedImg(newUrl);
      return;
    }
    const newIndex = currentIndex - 1;
    const newUrl = data.filter((item) => {
      return data.indexOf(item) === newIndex;
    });
    const newItem = newUrl[0]._image_link;
    setClickedImg(newItem);
    setCurrentIndex(newIndex);
    console.log(newItem)
  };
  
  return (
    <>
    <div className="md:flex items-center mt-4">
      <PhotoGallaryAds />
      <div className="PhotoGallary__wraper w-full md:w-[60%]">
        <PhotoSlider
          clickedImg={clickedImg}
          handelRotationRight={handelRotationRight}
          setClickedImg={setClickedImg}
          handelRotationLeft={handelRotationLeft}
          handleClick={handleClick}
          GallaryPhoto={GallaryPhoto}
          
        />
      </div>

    </div>

    {
            clickedImg && (
              <LightBox
              clickedImg={clickedImg}
              handelRotationRight={handelRotationRight}
              setClickedImg={setClickedImg}
              handelRotationLeft={handelRotationLeft}
  
            />
            )
          }

    </>
  )
}
