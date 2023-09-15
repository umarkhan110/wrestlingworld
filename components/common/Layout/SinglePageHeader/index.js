import Link from "next/link";
import Image from 'next/image';
import { RiCloseFill, RiCloseLine } from "react-icons/ri";
import { VscListSelection } from "react-icons/vsc";
import { BsSearch } from "react-icons/bs";
import { useState } from "react";
import dynamic from 'next/dynamic'

const MbSidebar = dynamic(() => import('./MbSidebar'), {
    ssr: false,
  })
const MbSearchBar = dynamic(() => import('./MbSearchBar'), {
    ssr: false,
  })
  

export default function MbHeader() {

    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [searchOpen, setSearchOpen] = useState(false)



    return (
        <>
            <div className=" pt-[8px] fixed z-20 bg-white top-0 w-full shadow-md px-5 flex justify-between items-center dark:bg-[#191919] h-[60px]">
                <div className="mb_sidebar">
                    {
                        sidebarOpen === true ? (
                            <button onClick={() => setSidebarOpen(false)}> <RiCloseFill className="block h-6 w-6" aria-hidden="true" /></button>
                        ) : (

                            <button onClick={() => setSidebarOpen(true)}> <VscListSelection className="block h-6 w-6" aria-hidden="true" /></button>
                        )
                    }

                    {
                        sidebarOpen === true && <MbSidebar setSidebarOpen={setSidebarOpen} />
                    }

                </div>
                <div className="mb_logo">
                    <Link href="/">
                        <a className="logo_wraper inline-block">
                            <Image className="!w-[130px] !h-[50px] md:w-[180px] md:h-[60px]" src="/ww-star-272x90.png" width="180" height="60" alt="logo" />
                        </a>
                    </Link>
                </div>
                <div className="mb_search">
                    {
                        searchOpen === false ? (
                            <button onClick={() => setSearchOpen(true)}>
                                <BsSearch className="w-5 h-5" />
                            </button>
                        ) : (
                            <button onClick={() => setSearchOpen(false)}>
                                <BsSearch className="w-5 h-5" />
                            </button>
                        )

                    }
                </div>
            </div>
            {
                searchOpen ? (
                    <div className="fixed top-0 z-30 bg-[#000000c9] h-screen w-full">
                        <div className=" relative h-full flex justify-center items-center">
                            <MbSearchBar />
                        </div>
                        <button onClick={() => setSearchOpen(false)} className="w-8 h-8  sm:w-14  sm:h-14 border-[#595959] hover:border-[#f1f1f1] rounded-full border-2 flex justify-center items-center absolute top-[30%] sm:top-[20%] right-[10%] sm:right-[20%]">
                            <RiCloseLine className=" text-white w-6 h-6 sm:w-8 sm:h-8" /></button>
                    </div>
                ): null
            }
            
        </>
    )
}
