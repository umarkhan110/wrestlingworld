import { Cookies } from "react-cookie";
import { createContext, useEffect, useState } from "react";
import { useTheme } from "next-themes";

export const ThemeContext = createContext({ theme: 'light', show: false, setShow: (text) => { }, setTheme: (text) => { } });
const ThemeProviderContext = ({ children }) => {
    const cookies = new Cookies();
    // const [theme, setTheme] = useState('light');
    const { theme, setTheme } = useTheme('light');
    const [show, setShow] = useState(false);
    useEffect(() => {
        cookies.get();
        if (!cookies.get('theme') || cookies.get('theme') === 'light') {
            setTheme('light')
        } else {
            setTheme('dark')
        }
    }, [theme, cookies])
    return (
        <ThemeContext.Provider
            value={{
                theme,
                setTheme,
                show,
                setShow
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
};
export default ThemeProviderContext;