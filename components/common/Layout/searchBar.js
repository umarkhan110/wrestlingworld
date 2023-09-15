import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { BsSearch } from "react-icons/bs";
import { Cookies } from "react-cookie";

const SearchBar = () => {
    const Router = useRouter()
    const cookies = new Cookies();
    const theme = cookies.get('theme')
    const [searchInput, setSearchInput] = useState("");
    const [placeHolder, setPlaceHolder] = useState("Search newsfeed with keywords...");
    const handleSubmitSearch = (e) => {
        e.preventDefault();
        if (searchInput.replaceAll(' ', '').length > 0) { Router.push(`/search?q=${searchInput}`) }
        else {
            setSearchInput('')
            setPlaceHolder('Please type something..')
        }
    };



    return (
        <div className='pt-2  hidden xl:block'>
            <form onSubmit={handleSubmitSearch} className='w-full h-[50px] dark:shadow-md search_shadow rounded-md  dark:bg-[#191919] bg-white  flex items-center flex-1'>

                <input minLength={1} type="search" onChange={(e) => setSearchInput(e.target.value)} name="search" aria-label='search' className={`font_exo placeholder:font-medium placeholder:text-sm text-[#222] dark:text-[#ccc] bg-transparent text-base flex-1 pr-2 outline-none pl-3 w-[90%]`} placeholder={placeHolder} />

                <button style={{ borderRadius: ' 0px 2px 2px 0px' }} type='submit' className='font-khand-headers h-[50px] xsm:px-4 px-4 searchbtn_shadow dark:shadow-md md:px-6 transition duration-300 relative z-30  leading-[16px] py-2.5 text-[#333] text-[15px] font-md'>
                    <BsSearch className='w-5 h-5' />
                </button>
            </form >
        </div >

    )
}

export default SearchBar