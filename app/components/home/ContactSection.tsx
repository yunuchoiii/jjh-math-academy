'use client';

import { useEffect, useRef, useState } from "react";
import styles from './Layout.module.css'
import { CONTACT_INFO, NAVER_MAP_LINK } from "@/constants";
import Link from "next/link";

declare global {
  interface Window {
    naver: {
      maps: naver.maps.Map;
    };
  }
}

export default function ContactSection () {
  const mapElement = useRef(null);
  const [naverMapsLoaded, setNaverMapsLoaded] = useState(false);

  useEffect(() => {
    // 네이버 맵스 스크립트 로드 확인
    if (window.naver && window.naver.maps) {
      setNaverMapsLoaded(true);
    } else {
      const intervalId = setInterval(() => {
        if (window.naver && window.naver.maps) {
          setNaverMapsLoaded(true);
          clearInterval(intervalId);
        }
      }, 100); // 100ms마다 체크

      // 클린업 함수
      return () => clearInterval(intervalId);
    }
  }, []);

  useEffect(() => {
    // 지도 초기화
    if (mapElement.current && naverMapsLoaded) {
      const { naver } = window;
      const location = new naver.maps.LatLng(37.655391, 127.067501);
      const mapOptions = {
        center: location,
        zoom: 16,
        zoomControl: false,
      };
      const map = new naver.maps.Map(mapElement.current, mapOptions);
      new naver.maps.Marker({
        position: location,
        map: map,
      });
    }
  }, [naverMapsLoaded]); // naverMapsLoaded가 변경될 때만 실행

  return <div className="w-full h-[750px] relative">
    <div className="absolute z-0 md:top-60 top-96 left-1/4 md:w-96 md:h-96 w-52 h-52 rounded-full bg-yellow-1"></div>
    <div className="absolute z-0 md:top-64 top-32 right-1/4 md:w-72 md:h-72 w-40 h-40 rounded-full bg-gradient-to-br from-[#37CC87] to-[#32EB97]"></div>
    <div className="absolute w-full h-full z-10 backdrop-blur-[200px] md:pt-52 pt-24 md:px-0 px-5 flex justify-center">
      <div className="grid grid-cols-12 md:gap-8 gap-4 2xl:w-[1200px] xl:w-[995px] w-[790px]">
        <div className={`md:col-span-6 col-span-12 md:h-[400px] h-80 rounded-3xl overflow-hidden relative ${styles['deem-shadow-3']}`}>
          <div ref={mapElement} className="w-full h-full"></div>
          <a href={NAVER_MAP_LINK} target="_blank" className="py-2 px-5 rounded-full md:text-sm text-xs font-bold bg-yellow-2 absolute bottom-7 left-1/2 -translate-x-1/2 z-20 hover:scale-110 transition-all">
            네이버 지도 바로가기
          </a>
        </div>
        <div className="md:col-span-6 col-span-12 md:-mt-0 -mt-[142px]">
          <a href={CONTACT_INFO.blog.link} target="_blank" className={`col-span-6 md:h-[185px] h-20 rounded-3xl flex items-center xl:flex-row md:flex-col xl:justify-start md:justify-center bg-[rgba(255,255,255,0.8)] hover:bg-white transition-all backdrop-blur-2xl 2xl:pl-8 xl:pl-7 pl-6 ${styles['deem-shadow-3']}`}>
            <div className="bg-[#CDE4BC] 2xl:w-20 2xl:h-20 md:w-16 md:h-16 w-9 h-9 rounded-full 2xl:mr-6 xl:mr-5 xl:mb-0 md:mb-3 flex items-center justify-center">
              <img src="/images/icons/blog-black.png" alt="" className="w-1/2 opacity-75"/>
            </div>
            <div className="xl:text-left md:text-center md:ml-0 ml-4">
              <div className="2xl:text-lg xl:text-base md:text-sm text-xs xl:mb-2.5 md:mb-1">
                블로그에서 더 많은 소식들을 확인할 수 있어요!
              </div>
              <div className="text-green-2 font-bold 2xl:text-3xl xl:text-2xl md:text-xl text-sm">
                네이버 블로그 바로가기
              </div>
            </div>
          </a>
          <div className="grid grid-cols-6 md:gap-8 gap-4 md:mt-[30px] mt-4">
            <a href={CONTACT_INFO.kakaotalk.link} target="_blank" className={`col-span-3 md:h-[185px] h-20 rounded-3xl flex items-center xl:flex-row md:flex-col xl:justify-start md:justify-center bg-[rgba(255,255,255,0.8)] hover:bg-white transition-all backdrop-blur-2xl 2xl:pl-8 xl:pl-7 pl-6 ${styles['deem-shadow-3']}`}>
              <div className="bg-[#FFECA8] 2xl:w-20 2xl:h-20 md:w-16 md:h-16 w-9 h-9 rounded-full 2xl:mr-6 xl:mr-5 xl:mb-0 md:mb-3 flex items-center justify-center">
                <img src="/images/icons/kakaotalk-black.png" alt="" className="w-1/2 opacity-75"/>
              </div>
              <div className="2xl:text-2xl xl:text-xl md:text-lg text-sm font-bold leading-snug text-[#444] md:ml-0 ml-4">
                카카오톡<br/>
                상담문의
              </div>
            </a>
            <a href={CONTACT_INFO.phone.link} target="_blank" className={`col-span-3 md:h-[185px] h-20 rounded-3xl flex items-center xl:flex-row md:flex-col xl:justify-start md:justify-center bg-[rgba(255,255,255,0.8)] hover:bg-white transition-all backdrop-blur-2xl 2xl:pl-8 xl:pl-7 pl-6 ${styles['deem-shadow-3']}`}>
              <div className="bg-[#D6E3E4] 2xl:w-20 2xl:h-20 md:w-16 md:h-16 w-9 h-9 rounded-full 2xl:mr-6 xl:mr-5 xl:mb-0 md:mb-3 flex items-center justify-center">
                <img src="/images/icons/phonecall-black.png" alt="" className="w-1/2 opacity-75"/>
              </div>
              <div className="2xl:text-2xl xl:text-xl md:text-lg text-sm font-bold leading-snug text-[#444] md:text-center md:ml-0 ml-4">
                전화 · 문자<br/>
                상담문의
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
}