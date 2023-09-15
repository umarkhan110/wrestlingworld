import dynamic from 'next/dynamic'

const SinglePageHeader = dynamic(() => import('./SinglePageHeader'), {
  ssr: false,
})

const Footer = dynamic(() => import('./Footer'), {
  ssr: false,
})


export default function SInglePageLayout({ children, QuotesData }) {
  return (
    <>
      <main className='lg:flex justify-start overflow-x-hidden'>
        <div className='w-full overflow-hidden'>
          <SinglePageHeader />
          {children}
          <Footer QuotesData={QuotesData} />
        </div>
      </main>
    </>
  )
}
