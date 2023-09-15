import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head >
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Exo:wght@100;200;300;400;500;600;700;800&family=Khand:wght@300;400;500;600;700&family=Nunito:wght@200;300;400;500;600;800&family=Oswald&display=swap" rel="stylesheet" /> 
        
      </Head>
      <body className='dark:bg-[#212121] bg-[#fafafa] text-black dark:text-white'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
