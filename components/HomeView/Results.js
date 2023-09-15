import Image from 'next/image'
import React, { useEffect, useContext } from 'react'
import {ThemeContext } from '../context/themeContext'



export default function Results({ CompaniesData, ShowsData, ResultsData }) {
    const defaultCompany = ShowsData?.find((i) => i?.title === ResultsData[0]?.shows?.nodes[0]?.name).companies?.nodes[0]?.name;
    // const cookies = new Cookies();
    const [seletedCompany, setSeletedCompany] = React.useState(defaultCompany);
    const [active, setActive] = React.useState(ResultsData[0]?.shows?.nodes[0]?.name);
    const [seletedData, setSeletedData] = React.useState();

    const { theme } = useContext(ThemeContext)

    // console.log(theme)

    useEffect(() => {
        if (active) {
            const fill = ResultsData.filter((resultItem) => resultItem?.shows?.nodes[0].name === active)

            setSeletedData(fill[0])
        } else {
            setSeletedData(ResultsData[0])
        }
    }, [active, ResultsData])


    return (
        <div className='results__wraper mt-10 md:mt-5'>
            <div className=" mt-2 flex justify-center items-center w-full relative mb-1  lg:mx-0">
                <div className="bg-[#ce061e] md:m-0 m-auto h-[4px] w-[20%]"></div>
                <h2 className={`px-5 uppercase md:pb-0 pb-2 text-[#111] dark:text-[#fafafa] dark:border-gray-900 text-base md:text-xl font-semibold text-center`}>
                    Quick Results
                </h2>
                <div className="bg-[#ce061e] md:m-0 m-auto h-[4px] w-[20%]"></div>
            </div>
            <ul className='flex items-center justify-center my-4'>
                {
                    CompaniesData?.map((company) => {
                        return (
                            <li onClick={() => setSeletedCompany(company?.name)} key={company?.id} className={`text-[16px] cursor-pointer bg-white dark:bg-[#191919] dark:text-white font-medium uppercase px-3 py-2 all_bg  text-black ${company?.name === seletedCompany && `!bg-[#ce061e] rounded-[4px] !text-white`}`}>{company?.name}</li>
                        )
                    })
                }
            </ul>
            <div className='bg-transparent md:flex lg:block xl:flex my-4'>

                <ul className=' bg-white dark:bg-[#191919] shadow-postLight dark:shadow-lg w-full md:w-[40%] lg:w-full xl:w-[40%] show__list  rounded-[4px] text-black  overflow-x-hidden no-scrollbar  overflow-y-scroll h-[200px] md:h-72'>
                    {
                        ShowsData?.map((item) => {

                            return (

                                item.companies.nodes[0].name === seletedCompany && (
                                    <li onClick={() => {
                                        setActive(item?.title)
                                    }} key={item.id} className={`cursor-pointer hover:bg-[#F3F4F6] dark:text-gray-100 p-2 dark:hover:bg-[#242328]  dark:border-gray-900   flex items-center 
                                            ${active === item?.title ? ('bg-[#F3F4F6] dark:bg-[#242328]') : ''}`}>

                                        <Image className=' rounded-md min-w-[60px]' src={item?.showsAndCompanies?.photo?.sourceUrl} width="60px" height="35px" alt="show" />
                                        <h1 className=' pl-4 text-sm font-extrabold uppercase italic'>{item?.title}</h1>
                                    </li>
                                )
                            )
                        })
                    }
                </ul>
                <div className='w-full ml-0 md:mt-0 mt-5 md:ml-5 md:w-[60%] rounded bg-white dark:bg-[#191919] shadow-postLight  dark:shadow-lg lg:w-full xl:w-[60%] overflow-x-hidden no-scrollbar overflow-y-scroll h-72'>
                    <div className='py-3  rounded-lg  w-full results_wraper px-5  text-base font-medium'>
                        <div 
                        className={`results_Main`} dangerouslySetInnerHTML={{ __html: seletedData?.content }} />
                    </div>
                </div>
            </div>
        </div>
    )
}
