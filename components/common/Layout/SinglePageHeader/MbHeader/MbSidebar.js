import Link from "next/link";
import { IoListOutline, IoLogoFacebook } from "react-icons/io5";
import dynamic from 'next/dynamic'
import { RiMenuLine,RiCloseFill, RiHome2Line,  RiArrowRightSLine, RiNewspaperFill, RiChat2Line, RiMedal2Line, RiListSettingsLine } from "react-icons/ri";
import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'

const DarkMode = dynamic(() => import('../DarkMode'), {
    ssr: false,
})

const NavLinks = [
    {
        label: 'Home',
        href: '/',
        navIcon: <RiHome2Line className=" w-4 h-4 " />,
        Isubmenu: false
    },
    {
        label: 'News',
        href: '/news',
        navIcon: <RiNewspaperFill className=" w-4 h-4 " />,
        Isubmenu: true,
        subMenu: [
            {
                label: 'WWE News',
                href: '/wwe-news',
            },
            {
                label: 'AEW News',
                href: '/aew-news',
            },
        ]
    },
    {
        label: 'Rumors',
        href: '/rumors',
        navIcon: <RiChat2Line className=" w-4 h-4 " />,
        Isubmenu: true,
        subMenu: [
            {
                label: 'WWE Rumors',
                href: '/wwe-rumors',
            },
            {
                label: 'AEW Rumors',
                href: '/aew-rumors',
            },
            {
                label: 'Rumor Roundup',
                href: '/rumor-round-up',
            },
        ]
    },
    {
        label: 'Results',
        href: '/results',
        navIcon: <RiMedal2Line className=" w-4 h-4 " />,
        Isubmenu: true,
        subMenu: [
            {
                label: 'WWE Raw',
                href: '/raw'
            },
            {
                label: 'WWE SmackDown',
                href: '/smackdown'
            },
            {
                label: 'WWE NXT',
                href: '/nxt'
            },
            {
                label: 'AEW Dynamite',
                href: '/aew-dynamite'
            },
            {
                label: 'AEW Rampage',
                href: '/aew-rampage'
            }
        ]

    },
    {
        label: 'PPV Schedule & Match Card',
        href: '/ppv-schedule-match-card',
        navIcon: <IoListOutline className=" w-4 h-4 " />,
        Isubmenu: false
    },
    {
        label: 'Lists',
        href: '/lists',
        navIcon: <RiListSettingsLine className=" w-4 h-4 " />,
        Isubmenu: false
    },
    // {
    //     label: 'Current Champions',
    //     href: '/current-champions',
    //     navIcon: <RiMenuLine className=" w-4 h-4 " />,
    //     Isubmenu: false

    // },
    // {
    //     label: 'Roster',
    //     href: '/roster',
    //     navIcon: <IoClipboardOutline className=" w-4 h-4 " />,
    //     Isubmenu: false

    // },
    // {
    //     label: 'Quick links',
    //     href: '#',
    //     navIcon: <RiListSettingsLine className=" w-4 h-4 " />,
    //     Isubmenu: true

    // },
]



export default function MBSideBars({setSidebarOpen}) {

    return (
        <div className="font_exo h-screen z-30 fixed top-0 left-0 px-5 py-4 w-[250px] bg-white dark:bg-[#191919]">
            <div className="flex justify-between items-center">
                <Link href="https://www.facebook.com/wrestlingworld">
                    <a className="logo_wraper">
                        <IoLogoFacebook className="w-5 h-5" />
                    </a>
                </Link>
                <button onClick={() => setSidebarOpen(false)}>
                    <RiCloseFill className="w-5 h-5" />
                </button>
            </div>
            <ul className="pt-10 h-[100%] overflow-y-scroll overflow-x-hidden">
                {
                    NavLinks?.map((navItem, idx) => {
                        return (
                            <li key={idx} className="cursor-pointer pb-8 hover:text-red-600 ">
                                <div className="flex justify-between items-center">

                                    {

                                        <Menu as="div" className="w-full relative inline-block text-left">
                                            <div className="flex items-center justify-between">
                                                <Link href={navItem.href}>
                                                    <a className="flex items-center text-[13px] font-medium uppercase">
                                                        <span className="pr-1">{navItem.navIcon}</span> {navItem.label}
                                                    </a>
                                                </Link>

                                                {
                                                    navItem.Isubmenu === true && (
                                                        <Menu.Button>
                                                            <RiArrowRightSLine
                                                                className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
                                                                aria-hidden="true"
                                                            />
                                                        </Menu.Button>
                                                    )
                                                }

                                            </div>
                                            {
                                                navItem.Isubmenu === true && (
                                                    <Transition
                                                        as={Fragment}
                                                        enter="transition ease-out duration-100"
                                                        enterFrom="transform opacity-0 scale-95"
                                                        enterTo="transform opacity-100 scale-100"
                                                        leave="transition ease-in duration-75"
                                                        leaveFrom="transform opacity-100 scale-100"
                                                        leaveTo="transform opacity-0 scale-95"
                                                    >
                                                        <Menu.Items className=" right-2 mt-2 w-36 origin-top-right divide-y divide-gray-100 rounded-md ">
                                                            <div className="px-1 py-1 ">
                                                                {
                                                                    navItem?.subMenu?.map((submenu, index) => {

                                                                        return (
                                                                            <Menu.Item key={index}>
                                                                                <Link href={submenu?.href}>
                                                                                    <a className="dark:text-gray-100
                                                                                    dark:hover:text-red-600 mt-4 flex items-center hover:text-red-600  text-gray-800  text-[13px] font-medium  capitalize">
                                                                                        <span className="pr-1">
                                                                                            <RiArrowRightSLine
                                                                                                className="w-4 h-4"
                                                                                            />
                                                                                        </span> {submenu?.label}
                                                                                    </a>
                                                                                </Link>
                                                                            </Menu.Item>
                                                                        )
                                                                    })
                                                                }
                                                            </div>
                                                        </Menu.Items>
                                                    </Transition>
                                                )
                                            }

                                        </Menu>

                                    }
                                </div>


                            </li>
                        )
                    })
                }
                {/* dark toggle */}
                <DarkMode />
            </ul>
        </div>
    )
}


