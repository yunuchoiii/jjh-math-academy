import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { HEADER_HEIGHT } from '@/constants'
import Header from './components/Layout/Header'
import Footer from './components/Layout/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '조재현 수학학원',
  description: 'JJH Math Academy',
}

export default function RootLayout({children, isHomePage}: {children: React.ReactNode, isHomePage: boolean}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header/>
        <div className='flex justify-center pt-[100px] lg:pt-[140px]'>
          <div className='2xl:max-w-7xl xl:max-w-6xl lg:max-w-4xl md:max-w-2xl sm:max-w-xl'>
            {children}
          </div>
        </div>
        <Footer/>
      </body>
    </html>
  )
}
