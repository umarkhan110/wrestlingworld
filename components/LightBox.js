import Image from "next/image";

const LightBox = ({
    clickedImg,
    setClickedImg,
    handelRotationRight,
    handelRotationLeft
}) => {
    const handleClick = (e) => {
        if (e.target.classList.contains("dismiss")) {
            setClickedImg(null);
        }
    };

    return (
        <div className="  z-40 fixed left-0 bottom-0 w-full h-screen bg-black">
            <div className=" h-full relative flex justify-center items-center" onClick={handleClick}>
                <div className=" relative md:flex items-center">
                    <div className="mt-5 md:mt-0 md:mb-0 mb-4 Ad__one bg-white mr-0 md:mr-6 rounded-lg w-full h-[200px]  md:w-[250px] md:h-[400px]">
                        <p className="flex justify-center items-center h-[100%] text-center text-sm">-Advertisement-
                            <br />
                            300X600
                        </p>
                    </div>
                    <Image src={clickedImg} className=" md:!w-[400px] md:!h-[400px] !w-[150px] !h-[150px]" width="400px" height="400px" alt="bigger pic" />
                    <div className="md:mt-0 mt-4 Ad__one bg-white ml-0 md:ml-6 rounded-lg  w-full h-[200px]  md:w-[250px] md:h-[400px]">
                        <p className="flex justify-center items-center h-[100%] text-center text-sm">-Advertisement-
                            <br />
                            300X600
                        </p>
                    </div>
                </div>
                <span className="dismiss absolute top-0 cursor-pointer bg-slate-800 w-10 text-center leading-10 rounded-full h-10 right-[45%]" onClick={handleClick}>
                    X
                </span>
                <div onClick={handelRotationLeft} className="cursor-pointer text-white absolute left-10 overlay-arrows_left">
                    <div>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                </div>
                <div onClick={handelRotationRight} className="cursor-pointer text-white absolute right-10 overlay-arrows_right">
                    <div>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LightBox;
