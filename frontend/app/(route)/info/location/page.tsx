'use client';

import ReactiveButton from "@/app/_components/Button/ReactiveButton";
import NaverMap from "@/app/_components/Map/NaverMap";
import Title from "@/app/_components/Title/Title";
import { NAVER_MAP_LINK } from "@/app/_constants/constants";

const LocationInfoPage = () => {

  const handleButtonClick = () => {
    window.open(NAVER_MAP_LINK, '_blank', 'noopener,noreferrer');
  };

  return <div>
    <Title title="오시는 길" color="green"/>
    <div className="w-full grid grid-cols-12 gap-[30px]">
      <div className="lg:col-span-6 col-span-12 h-[400px] rounded-[30px] overflow-hidden shadow-3 border border-[#ddd] relative">
        <NaverMap/>
        <ReactiveButton
          props={{
            className: 'absolute bottom-5 left-1/2 -translate-x-1/2 shadow-1 bg-green-1 text-white font-semibold w-auto px-5 py-2 rounded-full',
            onClick: handleButtonClick
          }}
        >
          네이버 지도 바로 가기
        </ReactiveButton>
      </div>
      <div className="lg:col-span-6 col-span-12">
        <div className="w-full lg:w-fit px-6 py-2.5 bg-blue-1 text-blue-2 font-bold text-lg rounded-bl-[30px] rounded-tr-[30px] text-center">
          노원 순복음 교회 옆 로또 건물<br className="block sm:hidden"/> 2층으로 올라오세요!
        </div>
        <div className="mt-5 flex flex-col gap-2.5">
          <div>
            <span className="text-blue-2 font-bold mr-2">주소</span>
            <span>서울 노원구 노원로 434 상가동 201호</span>
          </div>
          <div>
            <span className="text-blue-2 font-bold mr-2">전화번호</span>
            <span>010-8955-8180</span>
          </div>
          <div className="flex">
            <span className="text-blue-2 font-bold mr-2">운영시간</span>
            <ul className="list-disc pl-5 leading-relaxed">
              <li>월-금: 10:00 ~ 20:00</li>
              <li>토-일: 10:00 ~ 18:00</li>
            </ul>
          </div>
        </div>
        <hr className="text-[#D9D9D9] my-[15px]"/>
        <div>
          <div className="flex flex-col gap-[5px]">
            <div className="text-blue-2 font-bold mb-[5px]">버스 정보</div>
            <div>
              <b>1154</b> 상계중앙하이츠2단지 정류장에서 하차
            </div>
            <div>
              <b>1132</b>, <b>1167</b> 중앙하이츠2차아파트 정류장에서 하차
            </div>
          </div>
          <div className="flex flex-col gap-[10px] mt-5">
            <div className="text-blue-2 font-bold">지하철 정보</div>
            <div>
              <b>4·7호선 노원역</b> 하차 → 도보 약 8분(452m) 
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
}

export default LocationInfoPage;