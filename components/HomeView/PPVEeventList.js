import Link from "next/link";
import moment from "moment";
import { useState } from "react";

export default function PPVEeventList({ EventHomeList }) {

    const [seletedCompany, setSelectedCompany] = useState('All')

    return (
        <div className="py-10 top-0 sticky overflow: scroll">
    
            <div className=" mt-2 flex justify-center items-center w-full relative mb-1  lg:mx-0">
                 <div className="bg-[#ce061e] md:m-0 m-auto h-[4px] w-[10%] sm:w-[20%]"></div>
                <h2 className={`px-5 uppercase md:pb-0 pb-2 text-[#111] dark:text-[#fafafa] dark:border-gray-900 text-base md:text-xl font-semibold text-center`}>
                PPV & SPECIAL EVENTS SCHEDULE
                </h2>
                <div className="bg-[#ce061e] md:m-0 m-auto h-[4px] w-[10%] sm:w-[20%]"></div>
            </div>
            <div className="mt-6 flex justify-center items-center">
                <div className={`text-[16px] cursor-pointer font-medium uppercase px-3 py-2 dark:bg-[#191919] dark:text-white  bg-white  text-black ${'All' === seletedCompany && `!bg-[#ce061e] rounded !text-white`}`} onClick={() => setSelectedCompany('All')}>
                    All
                </div>
                <div className={`text-[16px] cursor-pointer font-medium uppercase px-3 py-2 dark:bg-[#191919] dark:text-white  bg-white  text-black ${'WWE' === seletedCompany && `!bg-[#ce061e] rounded !text-white`}`} onClick={() => setSelectedCompany('WWE')}>
                    wwe
                </div>
                <div className={`text-[16px] cursor-pointer font-medium uppercase px-3 py-2 dark:bg-[#191919] dark:text-white  bg-white  text-black ${'AEW' === seletedCompany && `!bg-[#ce061e] rounded !text-white`}`} onClick={() => setSelectedCompany('AEW')}>
                    AEW
                </div>
                <div className={`text-[16px] cursor-pointer font-medium uppercase px-3 py-2 dark:bg-[#191919] dark:text-white  bg-white  text-black ${'IMPACT' === seletedCompany && `!bg-[#ce061e] rounded !text-white`}`} onClick={() => setSelectedCompany('IMPACT')}>
                    IMPACT
                </div>
                <div className={`text-[16px] cursor-pointer font-medium uppercase px-3 py-2 dark:bg-[#191919] dark:text-white  bg-white  text-black mr-2 ${'NJPW' === seletedCompany && `!bg-[#ce061e] rounded !text-white`}`} onClick={() => setSelectedCompany('NJPW')}>
                    NJPW
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <ul className="bg-white rounded dark:shadow-2xl shadow-postLight dark:bg-[#191919]  py-2 mt-5 overflow-y-scroll no-scrollbar overflow-x-hidden h-[420px] md:h-[600px]">
                    {
                        EventHomeList?.map((item) => {
                            return (
                                item?.events_list_promotion === seletedCompany ? (

                                    <li className="my-3 hover:bg-[#F3F4F6] hover:dark:bg-[#222028] p-2" key={item._ID}>
                                        <Link href="/ppv-schedule-match-card" >
                                            <a className=" font_exo flex justify-start items-center">
                                                <div className='h-10 date__month p-2 rounded-lg !bg-[#ce061e] text-white text-center'>
                                                    <p className='text-xs leading-[7px]'>{moment(item?.events_list_date).format('MMM')} </p>
                                                    <p className=' font-black text-base'>{moment(item?.events_list_date).format('DD')}</p>
                                                </div>
                                                <span className=' pl-3 text-sm font-semibold uppercase'>{item?.events_list_name}

                                                </span>
                                            </a>
                                        </Link>
                                    </li>
                                ) : seletedCompany === 'All' ? (
                                    <li className="my-3 hover:bg-[#F3F4F6] hover:dark:bg-[#222028] p-2" key={item._ID}>
                                        <Link href="/ppv-schedule-match-card" >
                                            <a className=" font_exo flex justify-start items-center">
                                                <div className='h-10 date__month p-2 rounded-lg !bg-[#ce061e] text-white text-center'>
                                                    <p className='text-xs leading-[7px]'>{moment(item?.events_list_date).format('MMM')} </p>
                                                    <p className=' font-black text-base'>{moment(item?.events_list_date).format('DD')}</p>
                                                </div>
                                                <span className=' pl-3 text-sm font-semibold uppercase'>{item?.events_list_name}</span>
                                            </a>
                                        </Link>
                                    </li>
                                ) : null
                            )
                        })
                    }

                </ul>
                <div className="rounded  mt-5 flex justify-center  items-center h-[280px] sm:h-[600px] w-full">
                    <div className="lg:block hidden" data-aaad='true' data-aa-adunit='/22181265/ww_h_300v_2'></div>
                    <div className="lg:hidden block" data-aaad='true' data-aa-adunit='/22181265/ww_mob_h_1'></div>
                </div>
            </div>

        </div>
    )
}
