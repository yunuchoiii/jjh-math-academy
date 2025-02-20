'use client';

import Image from 'next/image';
import Link from 'next/link';
import HomeBanner from '../_components/Home/Banner';
import ContactSection from '../_components/Home/ContactSection';
import Curriculums from '../_components/Home/Curriculums';
import PartnersTab from '../_components/Home/PartnersTab';
import Programs from '../_components/Home/Programs';
import SpecialClasses from '../_components/Home/SpecialClasses';
import MobileDivider from '../_components/Layout/MobileDivider';
import { LOGO_GREEN_SRC } from '../_constants/constants';
import useScrollAnimation from '../_hooks/useScroll';

export default function Home() {
  const setRef = useScrollAnimation({threshold: 0.4, className: 'visible'});

  return (
    <div className="home-root flex flex-col items-center">
      <div className="absolute top-0 -z-50 hidden lg:block -mt-[100px] lg:-mt-[140px] xl:-mt-[20%] w-screen">
        <img src="/images/green-bg.svg" className="w-full" />
      </div>
      <section id="main-section" className="2xl:w-[80rem] xl:w-[72rem] lg:w-[56rem]">
        <div className="slide-in-bottom" ref={setRef}>
          <HomeBanner/>
        </div>
        <div className="pb-14">
          <div className="flex items-center justify-center md:flex-row flex-col md:mt-20 mt-6">
            <Image src={LOGO_GREEN_SRC} alt="logo" width={60} height={60}/>
            <div className="text-center md:ml-7 ml-0 md:mt-0 mt-5 NanumSquare ">
              <h2 className="xl:text-3xl md:text-2xl text-sm">
                완벽한 <span className="text-yellow-2 font-bold">개념</span>, 
                지독한 <span className="text-yellow-2 font-bold">연습</span>
              </h2>      
              <h1 className="xl:text-4xl md:text-3xl text-xl font-extrabold md:mt-4 mt-2.5">
                조재현 수학학원
              </h1>          
            </div>
          </div>
          <div className="flex flex-col items-center md:mt-12 mt-8">
            <div className="md:w-2 md:h-2 w-1.5 h-1.5 rounded-md bg-yellow-3"></div>
            <div className="w-0.5 h-10 bg-yellow-3"></div>
            <Link 
              href={"/#contact-section"}
              className="xl:py-4 xl:px-10 py-3 px-12 rounded-full bg-yellow-3 font-bold xl:text-2xl md:text-xl text-sm shadow-lg relative bottom-0 md:hover:bottom-2 hover:shadow-xl transition-all"
            >
              상담 안내
            </Link>
          </div>
        </div>
      </section>
      <section id="programs-section" className="bg-lightgray-1 w-full md:pt-32 md:pb-24 pt-14 pb-10 flex justify-center">
        <div className="2xl:w-[80rem] xl:w-[72rem] md:w-[56rem] w-[300px]">
          <div className="text-center mb-12">
            <h2 className="xl:text-2xl md:text-xl text-sm text-[#444]">
              <span className="font-bold">스마트</span>한 프로그램을 활용한
            </h2>
            <h1 className="xl:text-3xl md:text-2xl text-lg font-bold md:mt-3 mt-1">
              체계적인 <span className="text-green-2">학습 관리</span>
            </h1>
          </div>
          <div className="slide-in-bottom" ref={setRef}>
            <Programs/>
            <PartnersTab/>                
          </div>
        </div>
      </section>
      <MobileDivider/>
      <section id="special-classes-section" className="bg-lightgray-1 w-full md:pt-32 pt-14 pb-24 flex justify-center">
        <div className="xl:w-[995px] w-[790px]">
          <div className="text-center mb-12">
            <h2 className="xl:text-2xl md:text-xl text-sm font-semibold text-[#444]">
              대입으로 가는 첫걸음
            </h2>
            <h1 className="xl:text-3xl md:text-2xl text-lg font-bold md:mt-3 mt-1">
              교과 심화 <span className="text-green-2">사고력 수학</span>
            </h1>
          </div>
          <div className="slide-in-bottom" ref={setRef}>
            <SpecialClasses/>
          </div>
        </div>
      </section>
      <MobileDivider/>
      <section id="curriculum-section" className="bg-lightgray-1 w-full md:pt-32 pt-14 pb-24 flex justify-center">
        <div className="xl:w-[995px] w-[790px]">
          <div className="text-center mb-12">
            <h2 className="xl:text-2xl md:text-xl text-sm font-semibold text-[#444]">
              기초부터 심화까지 탄탄하게
            </h2>
            <h1 className="xl:text-3xl md:text-2xl text-lg font-bold md:mt-3 mt-1">
              초·중등 교과 수학
            </h1>
          </div>
          <div className="slide-in-bottom" ref={setRef}>
            <Curriculums/>
          </div>
        </div>
      </section>
      <MobileDivider/>
      <section id="contact-section" className="w-full md:h-screen mb-[1px]">
        <ContactSection/>
      </section>
    </div>      
  )
}
