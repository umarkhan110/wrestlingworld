import Link from "next/link";
import Image from 'next/image';
import { RiCloseFill } from "react-icons/ri";
import { BsSearch } from "react-icons/bs";
import { VscListSelection } from "react-icons/vsc";
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
            <div className="xl:hidden w-full shadow-md px-5 flex justify-between items-center dark:bg-[#191919] h-[60px]">
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
                        <a className="logo_wraper">
                            <Image src="/ww-star-272x90.png" width="130" height="50" alt="logo" />
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
                searchOpen === true && <MbSearchBar />
            }
            
        </>
    )
}
