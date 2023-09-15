import { Disclosure } from "@headlessui/react";
import Image from "next/image";
import { HiChevronRight } from "react-icons/hi";
import moment from "moment";

export default function EventsMatchs({ events, seletedCompany }) {
  // const FaqArr = Object.values(FaqData) company_event
  console.log(events);

  return (
    <div className="w-full px-4">
      <div className="mx-auto w-full rounded-2xl  p-2">
        {events?.map((item, idx) => {
          return (
            <>
              {seletedCompany === item?.company_event ? (
                <Disclosure key={idx}>
                  {({ open }) => (
                    <>
                      <Disclosure.Button className=" mb-3 bg-white dark:bg-[#191919] flex w-full justify-between items-center rounded-lg px-4 py-2 text-left text-sm font-medium  focus:outline-none dark:!shadow shadow-postLight">
                        <div className="font_exo flex justify-start items-center">
                          <div className="h-10 date__month text-center p-2 rounded-lg bg-red-600 text-white">
                            <p className="text-xs leading-[7px]">
                              {moment(item?._date_event).format("MMM")}{" "}
                            </p>
                            <p className=" font-black text-base">
                              {moment(item?._date_event).format("DD")}
                            </p>
                          </div>
                          <span className="pl-3 text-sm font-bold uppercase">
                            {item?.title_event}
                          </span>
                        </div>
                        <HiChevronRight
                          className={`${
                            open ? "rotate-90 transform" : ""
                          } h-5 w-5 text-red-500`}
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="mb-5 rounded bg-white dark:bg-[#191919] px-4 pt-4 pb-2 text-sm text-gray-500">
                        <div className="h-[240px] md:h-[120px] event_main grid grid-cols-1  md:grid-cols-3 gap-1">
                          <Image
                            className=" rounded-lg"
                            src={`${item?.imageurl_event}`}
                            width="360"
                            height="130"
                            alt="ddd"
                          />
                          <div className=" flex justify-center items-center text-center text-[18px] col-span-2 ml-0 md:ml-2 p-2 shadow rounded-lg dark:!text-white">
                            <div>
                              <p className="pb-2">
                                <span className=" font-bold">Date : </span>{" "}
                                {moment(item?._date_event).format("MMM")}{" "}
                                {moment(item?._date_event).format("DD")}
                              </p>
                              {/* <p className='pb-2'><span className=' font-bold'>Venue :  </span>{item.location}</p> */}
                              <p>
                                <span className=" font-bold">City : </span>
                                {item?.location_event}
                              </p>
                            </div>
                          </div>
                        </div>
                        {/* {console.log(item?.matches_event['item-0'])} */}
                        {/* <div dangerouslySetInnerHTML={{ __html: item?.new_matches_event }} /> */}
                        {Object.values(item?.matches_event).length > 0 ? (
                          <ul className="Matchs w-full pt-10 pb-5 dark:!text-white">
                            {/* <li className='text-2xl pb-5  w-full font-bold  text-center dark:!text-white text-black underline'><h4 >Impact Match Card</h4></li> */}

                            {Object.values(item?.matches_event)?.map(
                              (item, idx) => {
                                return (
                                  <li
                                    className="px-3 py-5 border-b-2 text-center  dark:border-[#000000]"
                                    key={idx}
                                  >
                                    <h3 className=" uppercase font-bold pb-2">
                                      {item?.matches_name.replace(/\\/g, "")}
                                    </h3>
                                    <p className="text-[18px]">
                                      {item?.wrestlers_name.replace(/\\/g, "")}
                                    </p>
                                  </li>
                                );
                              }
                            )}
                          </ul>
                        ) : null}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              ) : seletedCompany === "All" ? (
                <Disclosure key={idx}>
                  {({ open }) => (
                    <>
                      <Disclosure.Button className=" mb-3 bg-white dark:bg-[#191919] flex w-full justify-between items-center rounded-lg px-4 py-2 text-left text-sm font-medium  focus:outline-none dark:!shadow shadow-postLight">
                        <div className="font_exo flex justify-start items-center">
                          <div className="h-10 date__month text-center p-2 rounded-lg bg-red-600 text-white">
                            <p className="text-xs leading-[7px]">
                              {moment(item?._date_event).format("MMM")}{" "}
                            </p>
                            <p className=" font-black text-base">
                              {moment(item?._date_event).format("DD")}
                            </p>
                          </div>
                          <span className="pl-3 text-sm font-bold uppercase">
                            {item?.title_event}
                          </span>
                        </div>
                        <HiChevronRight
                          className={`${
                            open ? "rotate-90 transform" : ""
                          } h-5 w-5 text-red-500`}
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="mb-5 rounded bg-white dark:bg-[#191919] px-4 pt-4 pb-2 text-sm text-gray-500">
                        <div className="h-[240px] md:h-[120px] event_main grid grid-cols-1  md:grid-cols-3 gap-1">
                          <Image
                            className=" rounded-lg"
                            src={`${item?.imageurl_event}`}
                            width="360"
                            height="130"
                            alt="ddd"
                          />
                          <div className=" flex justify-center items-center text-center text-[18px] col-span-2 ml-0 md:ml-2 p-2 shadow rounded-lg dark:!text-white">
                            <div>
                              <p className="pb-2">
                                <span className=" font-bold">Date : </span>{" "}
                                {moment(item?._date_event).format("MMM")}{" "}
                                {moment(item?._date_event).format("DD")}
                              </p>
                              {/* <p className='pb-2'><span className=' font-bold'>Venue :  </span>{item.location}</p> */}
                              <p>
                                <span className=" font-bold">City : </span>
                                {item?.location_event}
                              </p>
                            </div>
                          </div>
                        </div>
                        {/* {console.log(item?.matches_event['item-0'])} */}
                        {/* <div dangerouslySetInnerHTML={{ __html: item?.new_matches_event }} /> */}
                        {Object.values(item?.matches_event).length > 0 ? (
                          <ul className="Matchs w-full pt-10 pb-5 dark:!text-white">
                            {/* <li className='text-2xl pb-5  w-full font-bold  text-center dark:!text-white text-black underline'><h4 >Impact Match Card</h4></li> */}

                            {Object.values(item?.matches_event)?.map(
                              (item, idx) => {
                                return (
                                  <li
                                    className="px-3 py-5 border-b-2 text-center  dark:border-[#000000]"
                                    key={idx}
                                  >
                                    <h3 className=" uppercase font-bold pb-2">
                                      {item?.matches_name.replace(/\\/g, "")}
                                    </h3>
                                    <p className="text-[18px]">
                                      {item?.wrestlers_name.replace(/\\/g, "")}
                                    </p>
                                  </li>
                                );
                              }
                            )}
                          </ul>
                        ) : null}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              ) : null}
            </>
          );
        })}
      </div>
    </div>
  );
}
