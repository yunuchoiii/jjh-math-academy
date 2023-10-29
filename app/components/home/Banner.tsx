'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from './Layout.module.css'

export default function HomeBanner () {
  const router = useRouter();
  const [activeBanner, setActiveBanner] = useState<Array<boolean>>([true, false, false, false]);

  const bannerList = [
    {
      title: "조재현\n수학학원",
      subtitle: "초중등전문 과외식학원",
      color: "#2A654A",
      backgroundColor: "#E1E3D9",
      imgPath: "/images/two-schoolgirls-working-together-assignment-classroom 2.png",
      imgHeight: 389,
      link: "/info/teacher",
    },
    {
      title: "시그마 클래스",
      subtitle: "심화 수학 사고력",
      color: "#272E34",
      backgroundColor: "linear-gradient(90deg, #C8CCCD 18.59%, #C2C6C7 83.1%)",
      imgPath: "/images/chalkboard-math.png",
      imgHeight: 328,
      link: "/program/sigma-class",
    },
    {
      title: "요리수\n연산교실",
      subtitle: "놀이로 배우는",
      color: "#7D4202",
      backgroundColor: "#E0DAC4",
      imgPath: "/images/child-play-study.png",
      imgHeight: 361,
      link: "/program/yorisu",
    },
    {
      title: "초·중등\n교과수학",
      subtitle: "기초를 탄탄하게",
      color: "#4F4E41",
      backgroundColor: "#DAE3D9",
      imgPath: "/images/study-girl-photo.png",
      imgHeight: 415,
      link: "/curriculum/elementary",
    },
  ];

  return <div className="flex">
    {bannerList.map((banner, index) => {
      const active = activeBanner[index];

      return <div
        key={`home-banner-${banner.title}`} 
        className={`${styles.banner} h-[480px] rounded-[30px] cursor-pointer transition-all duration-300 pt-10 flex flex-col xl:items-start w-1/6 pd-0 overflow-hidden NanumSquare ${active ? styles.active : 'xl:pl-5 lg:pl-0 lg:items-center'}`}
        style={{
          background: banner.backgroundColor,
          color: banner.color,
        }}
        onMouseOver={()=>setActiveBanner(prevState => prevState.map((_, i) => i === index))}
        onClick={()=>router.push(banner.link)}
      >
        <div>
          <div className="xl:text-lg lg:text-base font-bold decoration-slate-600">
            {
              index == 0 && !active? 
              <span dangerouslySetInnerHTML={{ __html: banner.subtitle.replace(' ', '<br />') }} /> : 
              banner.subtitle
            }
          </div>
          <div className="xl:text-2xl lg:text-xl font-extrabold mt-2.5">
            {
              !active? 
              <span dangerouslySetInnerHTML={{ __html: banner.title.replace('\n', '<br />') }} /> : 
              banner.title
            }
          </div>          
        </div>
        <div className="plusButton w-7 h-7 rounded-full flex items-center justify-center absolute top-10 right-9 transition-opacity duration-300 fade-in" style={{background: banner.color, opacity: active ? 1 : 0}}>
          <img src="/images/icons/plus_icon.png" alt="" width={15.38} className="invert"/>
        </div>
        <div 
          className="absolute w-full flex justify-center" 
          style={{
            left: 0, 
            bottom: !active ? 
              (index === 0 ? '-43px': 
              index === 2 ? '-22px':
              index === 3 ? '-16px' : 
              0) : 0, 
            transition: 'bottom 0.3s ease'}}
        >
          <img src={banner.imgPath} alt={banner.title} style={{height: banner.imgHeight}}/>
        </div>
      </div>
    })}
  </div>
}