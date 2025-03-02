'use client'

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import PlusIconButton from "../CustomButtons/PlusIconButton";

type Banner = {
  sort: number,
  title: string,
  subtitle: string,
  color: string,
  backgroundColor: string,
  imgPath: string,
  imgHeight: number,
  link: string
}

const bannerList: Banner[] = [
  {
    sort: 1,
    title: "조재현\n수학학원",
    subtitle: "초중등전문 과외식학원",
    color: "#2A654A",
    backgroundColor: "#E1E3D9",
    imgPath: "/images/two-schoolgirls-working-together-assignment-classroom-2.png",
    imgHeight: 396,
    link: "/info/introduction",
  },
  {
    sort: 2,
    title: "시그마 클래스",
    subtitle: "심화 수학 사고력",
    color: "#272E34",
    backgroundColor: "linear-gradient(90deg, #C8CCCD 18.59%, #C2C6C7 83.1%)",
    imgPath: "/images/chalkboard-math.png",
    imgHeight: 328,
    link: "/advanced-math/sigma-class",
  },
  {
    sort: 3,
    title: "요리수\n연산교실",
    subtitle: "놀이로 배우는",
    color: "#7D4202",
    backgroundColor: "#E0DAC4",
    imgPath: "/images/child-play-study.png",
    imgHeight: 368,
    link: "/advanced-math/yorisu",
  },
  {
    sort: 4,
    title: "초·중등\n교과수학",
    subtitle: "기초를 탄탄하게",
    color: "#4F4E41",
    backgroundColor: "#DAE3D9",
    imgPath: "/images/study-girl-photo.png",
    imgHeight: 415,
    link: "/common-math/elementary",
  },
];

const HomeBanner = () => {
  const isMobile = useMediaQuery('(max-width: 640px)');
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // PC Version 배너 자동 활성화
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prevIndex => (prevIndex + 1) % bannerList.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [activeIndex]);

  // Mobile Version 스크롤 이벤트
  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollPosition = scrollRef.current.scrollLeft;
      const cardWidth = 280;
      const newIndex = Math.round(scrollPosition / cardWidth);
      setActiveIndex(newIndex);
    }
  };

  // Mobile Version 스크롤 이벤트 처리
  useEffect(() => {
    const currentScrollRef = scrollRef.current;
    if (currentScrollRef && isMobile) {
      currentScrollRef.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (currentScrollRef && isMobile) {
        currentScrollRef.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return <>
    {/* PC Version */}
    <div className="lg:flex hidden">
      <div className="flex w-full gap-10">
        {bannerList.map((banner, index) => {
          const active = activeIndex === index;
          return (
            <Link
              href={banner.link}
              key={`home-banner-${banner.title}`} 
              className={`relative h-[480px] rounded-[30px] cursor-pointer transition-all duration-300 flex flex-col xl:items-start pd-0 overflow-hidden NanumSquare ${active ? "w-3/6 pt-10" : "w-1/6 pt-6"}`}
              style={{
                background: banner.backgroundColor,
                color: banner.color,
              }}
              onMouseOver={() => setActiveIndex(index)}
            >
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full transition-all duration-300" 
                style={{
                  width: active && index === 1 ? "412px" : '100%',
                  height: banner.imgHeight,
                  bottom: !active ? 
                    (index === 0 ? '-52px': 
                    index === 2 ? '-30px':
                    index === 3 ? '-16px' : 
                    0) : 0, 
                }}
              >
                <Image 
                  src={banner.imgPath} 
                  alt={banner.title} 
                  className="w-full h-full object-cover"
                  priority
                  width={500}
                  height={500}
                />
              </div>
              <div className={`${active ? "ml-[50px]" : index === 1 ? "lg:ml-[8px] xl:ml-[18px] 2xl:ml-6" : "lg:ml-4 xl:ml-7"} transition-all duration-300`}>
                <div className={`xl:text-lg lg:text-base font-bold text-black ${active ? "whitespace-nowrap" : ""}`}>
                  {
                    index == 0 && !active? 
                    <span dangerouslySetInnerHTML={{ __html: banner.subtitle.replace(' ', '<br />') }} /> : 
                    banner.subtitle
                  }
                </div>
                <div className={`xl:text-2xl lg:text-xl font-extrabold mt-2.5 ${active ? "whitespace-nowrap" : ""}`}>
                  {
                    !active? 
                    <span dangerouslySetInnerHTML={{ __html: banner.title.replace('\n', '<br />') }} /> : 
                    banner.title
                  }
                </div>          
              </div>
              <div className={`absolute top-10 right-10 transition-opacity duration-300 fade-in ${active ? "opacity-100" : "opacity-0"}`}>
                <PlusIconButton color={banner.color} size={30}/>
              </div>
            </Link>
          );
        })}
      </div>
    </div>  

    {/* Mobile Version */}
    <div className="lg:hidden flex w-screen justify-center">
      <div 
        ref={scrollRef}
        className="flex w-full overflow-x-scroll hidden-scroll -mt-16 pt-16 pb-14 sm:px-12 px-[calc(50vw-150px)]" 
        style={{
          scrollSnapType: 'x mandatory',
        }}
      >
        {bannerList.map((banner, index) => (
          <Link
            href={banner.link}
            key={`mobile-banner-${banner.sort}`}
            className={`h-[300px] w-[280px] mx-3 rounded-xl relative overflow-x-scroll flex-shrink-0 snap-center transition-all duration-300 ${index === activeIndex ? 'scale-110 sm:scale-100 shadow-xl sm:shadow-lg' : 'scale-100 shadow-lg'}`}
            style={{ background: banner.backgroundColor }}
          >
            <div className="mt-7 mx-6 flex justify-between">
              <div className="leading-snug NanumSquare">
                <div className="text-base font-bold mb-1">
                  {banner.subtitle}
                </div>
                <div className="text-2xl font-extrabold" style={{color: banner.color}}>
                  {banner.title}
                </div>
              </div>
              <PlusIconButton color={banner.color} size={20}/> 
            </div>
            <div className="absolute bottom-0 flex justify-center w-full h-[200px] bg-no-repeat bg-top" style={{
              backgroundImage: `url(${banner.imgPath})`,
              backgroundSize: banner.sort === 2 ? '90%' : 'cover',
            }}>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </>
}

export default HomeBanner;