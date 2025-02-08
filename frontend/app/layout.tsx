import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import Body from './_components/Layout/Body'
import Footer from './_components/Layout/Footer'
import Header from './_components/Layout/Header'
import RecoilRootWrapper from './_components/Recoil/recoilRootWrapper'
import { ToastProvider } from './_components/Toast/ToastProvider'
import './_styles/animations.css'
import './_styles/font.css'
import './_styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

declare global {
  interface Window {
    naver: {
      maps: naver.maps.Map;
    };
  }
}

export const metadata: Metadata = {
  title: '조재현 수학학원',
  description: 'JJH Math Academy',
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet"/>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.2/css/all.min.css"
        />
        <link rel="stylesheet" href="https://cdn.ckeditor.com/ckeditor5/44.1.0/ckeditor5.css" />
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta name="keywords" content="수학, 학원, 조재현, 수학학원, 교육"/>
        <meta name="author" content="조재현 수학학원"/>
        <meta property="og:title" content="조재현 수학학원"/>
        <meta property="og:description" content="JJH Math Academy"/>
        <meta property="og:image" content="/path/to/image.jpg"/>
        <meta property="og:url" content="https://jjhmath.co.kr"/>
      </head>
      <body className={inter.className}>
        <RecoilRootWrapper>
          <ToastProvider>
            <Header/>
            <Body>
              {children}
            </Body>
            <Footer/>
          </ToastProvider>
        </RecoilRootWrapper>
        <Script type="text/javascript" src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NAVER_MAP_CLIENT_ID}`}/>
      </body>
    </html>
  )
}
