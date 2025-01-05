'use client';

import useScrollAnimation from "@/app/_hooks/scroll";
import { MENU_INFO } from "@/constants";
import Link from "next/link";
import MobileDivider from "../Layout/MobileDivider";
import HomeBanner from "./Banner";
import ContactSection from "./ContactSection";
import Curriculums from "./Curriculums";
import PartnersTab from "./PartnersTab";
import Programs from "./Programs";
import SpecialClasses from "./SpecialClasses";

export  default function HomeComponent () {
  const setRef = useScrollAnimation(0.4);

  return (
    <div className="home-root flex flex-col items-center">
      <div className="absolute top-0 -z-50 hidden lg:block -mt-[100px] lg:-mt-[140px] xl:-mt-[20%] w-screen">
        <img src="/images/green-bg.svg" className="w-full" />
      </div>
      <div id="main-section" className="2xl:w-[80rem] xl:w-[72rem] lg:w-[56rem]">
        <div className="slide-in-bottom" ref={setRef}>
          <HomeBanner/>
        </div>
        <div className="pb-14">
          <div className="flex items-center justify-center md:flex-row flex-col md:mt-20 mt-10">
            <img src="/images/logos/logo_green.png" alt="logo" width={60}/>
            <div className="text-center md:ml-7 ml-0 md:mt-0 mt-5 NanumSquare">
              <div className="xl:text-3xl md:text-2xl text-sm">
                완벽한 <span className="text-yellow-2 font-bold">개념</span>, 
                지독한 <span className="text-yellow-2 font-bold">연습</span>
              </div>      
              <div className="xl:text-4xl md:text-3xl text-xl font-extrabold md:mt-4 mt-2.5">
                조재현 수학학원
              </div>          
            </div>
          </div>
          <div className="flex flex-col items-center md:mt-12 mt-8">
            <div className="md:w-2 md:h-2 w-1.5 h-1.5 rounded-md bg-yellow-3"></div>
            <div className="w-0.5 h-10 bg-yellow-3"></div>
            <Link 
              href={MENU_INFO.contact.link!}
              className="xl:py-4 xl:px-10 py-3 px-12 rounded-full bg-yellow-3 font-bold xl:text-2xl md:text-xl text-sm shadow-lg relative bottom-0 md:hover:bottom-2 hover:shadow-xl transition-all"
            >
              상담 안내
            </Link>
          </div>
        </div>
      </div>
      <div id="programs-section" className="bg-lightgray w-full md:pt-32 md:pb-24 pt-14 pb-10 flex justify-center">
        <div className="2xl:w-[80rem] xl:w-[72rem] md:w-[56rem] w-[300px]">
          <div className="text-center mb-12">
            <div className="xl:text-3xl md:text-2xl text-sm">
              <span className="font-bold">스마트</span>한 프로그램을 활용한
            </div>
            <div className="xl:text-4xl md:text-3xl text-lg font-bold md:mt-4 mt-1">
              체계적인 <span className="text-green-2">학습 관리</span>
            </div>
          </div>
          <div className="slide-in-bottom" ref={setRef}>
            <Programs/>
            <PartnersTab/>                
          </div>
        </div>
      </div>
      <MobileDivider/>
      <div id="special-classes-section" className="bg-lightgray w-full md:pt-32 pt-14 pb-24 flex justify-center">
        <div className="xl:w-[995px] w-[790px]">
          <div className="text-center mb-12">
            <div className="xl:text-3xl md:text-2xl text-sm font-bold">
              대입으로 가는 첫걸음
            </div>
            <div className="xl:text-4xl md:text-3xl text-lg font-bold md:mt-4 mt-1 text-green-2">
              교과 심화 사고력 수학
            </div>
          </div>
          <div className="slide-in-bottom" ref={setRef}>
            <SpecialClasses/>
          </div>
        </div>
      </div>
      <MobileDivider/>
      <div id="curriculum-section" className="bg-lightgray w-full md:pt-32 pt-14 pb-24 flex justify-center">
        <div className="xl:w-[995px] w-[790px]">
          <div className="text-center mb-12">
            <div className="xl:text-3xl md:text-2xl text-sm font-bold">
              대입으로 가는 첫걸음
            </div>
            <div className="xl:text-4xl md:text-3xl text-lg font-bold md:mt-4 mt-1 text-green-2">
              초·중등 교과 수학
            </div>
          </div>
          <div className="slide-in-bottom" ref={setRef}>
            <Curriculums/>
          </div>
        </div>
      </div>
      <MobileDivider/>
      <div id="contact-section" className="w-full md:h-screen mb-[1px]">
        <ContactSection/>
      </div>
    </div>      
  )
}