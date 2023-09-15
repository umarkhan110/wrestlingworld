
const labelPositionClassNames = {
  right: "justify-end",
  left: "justify-start",
  center: "justify-center",
};

function SectionTitle({ title, className, labelPosition = "left" }) {

  return (
    <>
      <div className="hidden md:flex items-center  mb-1 mx-4 lg:mx-0">
        <h2 className={`flex  ${labelPositionClassNames[labelPosition]}`}>
          <span
            className={`${labelPosition === "center" ? "px-2" : labelPosition === "right" ? "pl-2" : "pr-2"
              } pr-4 text-[24px] font-semibold uppercase ${className} dark:text-[#efefef]  text-[#494949]`}
          >
            {title}
          </span>
        </h2>
        <div className=" flex-1 bg-[#ce061e] h-[4px] w-[300px]"></div>
      </div>
      <div className="xsm:flex mt-2 md:hidden flex-col justify-center items-center w-full relative mb-1  lg:mx-0">
        <h2 className={`uppercase md:pb-0 pb-2 text-[#111] dark:text-[#fafafa] text-base md:text-xl font-semibold text-center`}>
          {title}
        </h2>
        <div className="bg-[#ce061e] md:m-0 m-auto h-[2px] w-[50%]"></div>
      </div>
    </>
  );
}

export default SectionTitle;