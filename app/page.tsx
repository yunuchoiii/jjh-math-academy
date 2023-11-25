import { MENU_INFO } from "@/constants";
import HomeBanner from "./components/Home/Banner";
import Link from "next/link";
import Programs from "./components/Home/Programs";
import PartnersTab from "./components/Home/PartnersTab";
import SpecialClasses from "./components/Home/SpecialClasses";
import Curriculums from "./components/Home/Curriculums";
import ContactSection from "./components/Home/ContactSection";
import Script from 'next/script'

export default function Home() {
  return (
      <div className="homeBody flex flex-col items-center">
        <Script type="text/javascript" src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NAVER_MAP_CLIENT_ID}`}/>
        <div id="section-1" className="2xl:w-[80rem] xl:w-[72rem] lg:w-[56rem] slide-in-bottom">
          <HomeBanner/>
          <div className="pb-14">
            <div className="flex items-center justify-center lg:flex-row flex-col lg:mt-20 mt-10">
              <img src="/images/logos/logo_green.png" alt="logo" width={60}/>
              <div className="text-center lg:ml-7 ml-0 lg:mt-0 mt-5 NanumSquare">
                <div className="xl:text-3xl lg:text-2xl text-sm">
                  완벽한 <span className="text-yellow-2 font-bold">개념</span>, 
                  지독한 <span className="text-yellow-2 font-bold">연습</span>
                </div>      
                <div className="xl:text-4xl lg:text-3xl text-xl font-extrabold lg:mt-4 mt-2.5">
                  조재현 수학학원
                </div>          
              </div>
            </div>
            <div className="flex flex-col items-center lg:mt-12 mt-8">
              <div className="lg:w-2 lg:h-2 w-1.5 h-1.5 rounded-md bg-yellow-3"></div>
              <div className="w-0.5 h-10 bg-yellow-3"></div>
              <Link 
                href={MENU_INFO.contact.link!}
                className="xl:py-4 xl:px-10 py-3 px-12 rounded-full bg-yellow-3 font-bold xl:text-2xl lg:text-xl text-sm shadow-lg relative bottom-0 lg:hover:bottom-2 hover:shadow-xl transition-all"
              >
                상담 안내
              </Link>
            </div>
          </div>
        </div>
        <div id="section-2" className="bg-lightgray w-full pt-32 pb-24 flex justify-center">
          <div className="2xl:w-[80rem] xl:w-[72rem] lg:w-[56rem]">
            <div className="text-center mb-12">
              <div className="xl:text-3xl lg:text-2xl">
                <span className="font-bold">스마트</span>한 프로그램을 활용한
              </div>
              <div className="xl:text-4xl lg:text-3xl font-bold mt-4">
                체계적인 <span className="text-green-2">학습 관리</span>
              </div>
            </div>
            <Programs/>
            <PartnersTab/>           
          </div>
        </div>
        <div id="section-3" className="bg-lightgray w-full pt-32 pb-24 flex justify-center">
          <div className="xl:w-[995px] lg:w-[790px]">
            <div className="text-center mb-12">
              <div className="xl:text-3xl lg:text-2xl font-bold">
                대입으로 가는 첫걸음
              </div>
              <div className="xl:text-4xl lg:text-3xl font-bold mt-4 text-green-2">
                교과 심화 사고력 수학
              </div>
            </div>
            <SpecialClasses/>
          </div>
        </div>
        <div id="section-4" className="bg-lightgray w-full pt-32 pb-24 flex justify-center">
          <div className="xl:w-[995px] lg:w-[790px]">
            <div className="text-center mb-12">
              <div className="xl:text-3xl lg:text-2xl font-bold">
                대입으로 가는 첫걸음
              </div>
              <div className="xl:text-4xl lg:text-3xl font-bold mt-4 text-green-2">
                초·중등 교과 수학
              </div>
            </div>
            <Curriculums/>
          </div>
        </div>
        <div id="section-5" className="w-full">
          <ContactSection/>
        </div>
      </div>      
  )
}
