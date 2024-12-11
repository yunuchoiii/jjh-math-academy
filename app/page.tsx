import Script from 'next/script'
import HomeComponent from './components/home/Home'

export default function Home() {
  return <>
    <Script type="text/javascript" src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NAVER_MAP_CLIENT_ID}`}/>
    <HomeComponent/>
  </>
}
