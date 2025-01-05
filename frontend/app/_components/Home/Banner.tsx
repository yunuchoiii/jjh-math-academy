'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";
import PlusIconButton from "../CustomButtons/PlusIconButton";

const HomeBanner = () => {
  const router = useRouter();
  const [activeBanner, setActiveBanner] = useState<Array<boolean>>([true, false, false, false]);

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
      link: "/info/teacher",
    },
    {
      sort: 2,
      title: "시그마 클래스",
      subtitle: "심화 수학 사고력",
      color: "#272E34",
      backgroundColor: "linear-gradient(90deg, #C8CCCD 18.59%, #C2C6C7 83.1%)",
      imgPath: "/images/chalkboard-math.png",
      imgHeight: 328,
      link: "/program/sigma-class",
    },
    {
      sort: 3,
      title: "요리수\n연산교실",
      subtitle: "놀이로 배우는",
      color: "#7D4202",
      backgroundColor: "#E0DAC4",
      imgPath: "/images/child-play-study.png",
      imgHeight: 368,
      link: "/program/yorisu",
    },
    {
      sort: 4,
      title: "초·중등\n교과수학",
      subtitle: "기초를 탄탄하게",
      color: "#4F4E41",
      backgroundColor: "#DAE3D9",
      imgPath: "/images/study-girl-photo.png",
      imgHeight: 415,
      link: "/curriculum/elementary",
    },
  ];

  const MobileBannerCard = ({ item }: { item: Banner }) => {
    return (
      <div 
        className={`h-[300px] w-[280px] mx-2.5 rounded-xl relative overflow-x-scroll flex-shrink-0 snap-center`}
        style={{
          background: item.backgroundColor, 
          boxShadow: '8px 8px 24px 0px rgba(0, 0, 0, 0.10), -8px -8px 24px 0px rgba(255, 255, 255, 0.10)',
        }}
      >
        <div className="mt-7 mx-6 flex justify-between">
          <div className="leading-snug">
            <div className="text-base font-bold NanumSquare mb-1">
              {item.subtitle}
            </div>
            <div className="text-2xl font-bold" style={{color: item.color}}>
              {item.title}
            </div>
          </div>
          <PlusIconButton color={item.color} size={20}/>
        </div>
        <div className="absolute bottom-0 flex justify-center w-full h-[200px] bg-no-repeat bg-top" style={{
          backgroundImage: `url(${item.imgPath})`,
          backgroundSize: item.sort === 2 ? '90%' : 'cover',
        }}>
          {/* <img src={item.imgPath}/> */}
        </div>
      </div>
    );
  }

  return <>
    {/* PC Version */}
    <div className="lg:flex hidden">
      <div className="flex w-full gap-10">
        {bannerList.map((banner, index) => {
          const active = activeBanner[index];
          return (
            <div
              key={`home-banner-${banner.title}`} 
              className={`relative h-[480px] rounded-[30px] cursor-pointer transition-all duration-300 flex flex-col xl:items-start pd-0 overflow-hidden NanumSquare ${active ? "w-3/6 pt-10" : "w-1/6 pt-6"}`}
              style={{
                background: banner.backgroundColor,
                color: banner.color,
              }}
              onMouseOver={() => setActiveBanner(prevState => prevState.map((_, i) => i === index))}
              onClick={() => router.push(banner.link)}
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
                <img src={banner.imgPath} alt={banner.title} className="w-full h-full object-cover"/>
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
            </div>
          );
        })}
      </div>
    </div>  

    {/* Mobile Version */}
    <div className="lg:hidden flex w-screen">
      <div 
        className="flex w-full overflow-x-scroll hidden-scroll -mt-16 pt-16 pb-10 sm:px-12 px-[calc(50vw-150px)]" 
        style={{
          scrollSnapType: 'x mandatory',
        }}
      >
        {bannerList.map(i => <MobileBannerCard item={i} key={`mobile-banner-${i.sort}`}></MobileBannerCard>)}
      </div>
    </div>
  </>
}

export default HomeBanner;