import type { Metadata } from 'next'
import Script from 'next/script'
import Body from './_components/Layout/Body'
import Footer from './_components/Layout/Footer'
import Header from './_components/Layout/Header'
import RecoilRootWrapper from './_components/Recoil/recoilRootWrapper'
import { ToastProvider } from './_components/Toast/ToastProvider'
import './_styles/animations.css'
import './_styles/font.css'
import './_styles/globals.css'

declare global {
  interface Window {
    naver: {
      maps: naver.maps.Map;
    };
  }
}

export const metadata: Metadata = {
  title: '조재현 수학학원 | 노원구 최고의 초·중등 수학 학원',
  description: '노원구에서 믿고 맡길 수 있는 초·중등 수학 전문 학원! 교과 수학부터 사고력 수학까지 체계적인 학습을 제공합니다. 학습 상담 예약하세요!',
  keywords: '노원구 수학학원, 초등 수학, 중등 수학, 교과 수학, 사고력 수학, 시그마 클래스, 요리수 연산, 수학 경시대회 대비, 맞춤형 수학 교육, 수학 학습법',
  authors: [{name: '조재현 수학학원'}],
  openGraph: {
    title: '조재현 수학학원 | 노원구 최고의 초·중등 수학 학원',
    description: '초·중등 수학의 모든 것! 교과 & 사고력 수학 완벽 대비, 맞춤형 학습 설계!',
    images: [
      {
        url: '/images/og-thumbnail.png', 
        width: 1200,
        height: 630,
        alt: '조재현 수학학원 - 초·중등 수학 맞춤 교육'
      }
    ],
    url: 'https://jjhmath.com',
    siteName: '조재현 수학학원',
    type: 'website',
  },
};

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
      </head>
      <body>
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
