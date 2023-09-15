import {  RiMoonFill } from "react-icons/ri";
import { BiSun } from 'react-icons/bi'
import { Cookies } from "react-cookie";
import { useContext } from "react";
import {ThemeContext} from '../../context/themeContext';

const DarkMode = () => {
    const { setTheme, show, theme, setShow } = useContext(ThemeContext)
    // const { theme, setTheme } = useTheme();

    const cookies = new Cookies();
    const handleChangeTheme = () => {
        if (theme === 'light') {
            cookies.set('theme', 'dark')
            setTheme('dark')
        } else {
            cookies.set('theme', 'light')
            setTheme('light')
        }
    }
    return (

        <>
            <div 
            style={{ boxShadow: `0 0 3px 1px ${theme === 'light' ? '#E5E5E5' : '#292929'} inset` }} 
            onClick={handleChangeTheme} 
            className={`${theme === 'light' ? 'bg-[#fafafa]' : 'bg-[#212121]'} cursor-pointer flex p-[2px] rounded-full  w-[3rem] transition duration-30`}>
                <div 
                className={`${theme === 'light' ? 'mr-auto bg-white' : 'ml-auto bg-light-black'} w-5 flex transition duration-300   items-center justify-center cursor-pointer h-5 rounded-full  `}>
                    {theme === 'light' ? <RiMoonFill className="h-4 w-4 " /> : <BiSun className="h-4 w-4 " />}
                </div>
            </div>
        </>
    )
}


export default DarkMode;