import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Footer from './_components/Layout/Footer'
import Header from './_components/Layout/Header'
import RecoilRootWrapper from './_components/Recoil/recoilRootWrapper'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

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
      </head>
      <body className={inter.className}>
        <RecoilRootWrapper>
          <Header/>
          <div className='flex justify-center pt-[100px] lg:pt-[140px]'>
            <div className='w-full 2xl:max-w-7xl xl:max-w-6xl lg:max-w-4xl md:max-w-2xl sm:max-w-xl px-5 sm:px-0'>
            {children}
            </div>
          </div>
          <Footer/>
        </RecoilRootWrapper>
      </body>
    </html>
  )
}
