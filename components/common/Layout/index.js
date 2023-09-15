import dynamic from 'next/dynamic'
import Footer from './Footer'
const MbHeader = dynamic(() => import('./MbHeader'), {
  ssr: false,
})

// const Footer = dynamic(() => import('./Footer'), {
//   ssr: false,
// })
const SideBar = dynamic(() => import('./SideBar'), {
  ssr: false,
})

export default function Layout({ children, QuotesData }) {

  

  return (
    <>
      <main className='lg:flex justify-start overflow-x-hidden'>
        <div  className=' overflow-hidden hidden xl:block sidebar w-[200px] relative  dark:bg-[#171717] shadow-lg'>
          <SideBar />
        </div>
        <div className='w-full overflow-hidden'>
          <MbHeader />
          {children}
          {/* <FooterTextSLider /> */}
          <Footer QuotesData={QuotesData} />
        </div>
      </main>
    </>
  )
}
