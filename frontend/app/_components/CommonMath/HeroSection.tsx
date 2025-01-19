"use client"

import { CONTACT_SECTION_LINK } from "@/app/_constants/constants";
import { useRouter } from "next/navigation";
import { useRef } from 'react';
import ReactiveButton from "../Button/ReactiveButton";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  type: "elementary" | "middle" | "yorisu" | "sigma"
}

const BgCircle = ({styleClass, position}: {styleClass: string, position: "left" | "right"}) => {
  return <div className={`absolute md:top-1/2 md:-translate-y-1/2 ${position === "left" ? "top-[20%] left-[10%]" : "top-[50%] right-[10%]"} 2xl:w-[350px] 2xl:h-[350px] lg:w-[300px] lg:h-[300px] w-[230px] h-[230px] rounded-full bg-gradient-to-br ${styleClass}`}></div>
}

const HeroSection = ({ title, subtitle, type }: HeroSectionProps) => {
  const router = useRouter();
  const sectionRef = useRef<HTMLElement>(null);

  const goToContact = () => {
    router.push(CONTACT_SECTION_LINK);
  }

  const scrollToEnd = () => {
    console.log(sectionRef.current?.offsetHeight);
    if (sectionRef.current?.offsetHeight) {
      window.scrollTo({
        top: sectionRef.current.offsetHeight - 120,
        behavior: 'smooth'
      });
    }
  }

  
  const CommonButtons = {
    primary: {
      text: "커리큘럼 알아보기",
      onClick: scrollToEnd 
    },
    secondary: {
      style: "text-green-2 bg-green-4",
      text: "무료 상담 신청하기",
      onClick: goToContact
    }
  };

  const ElementsByType = {
    elementary: {
      bgCircles: {
        left: "from-[rgba(225,220,96,0.5)] to-[rgba(239,194,35,1)]",
        right: "from-[#FBEF84] to-[#EFC223]",
      },
      title: "text-yellow-5",
      imgPath: "/images/elementary-student.png",
      buttons: {
        primary: "text-white bg-yellow-5",
        secondary: "text-[#A48104] bg-yellow-4",
      }
    },
    middle: {
      bgCircles: {
        left: "from-[rgba(97,180,141,1)] to-[rgba(97,180,141,0.7)]",
        right: "from-[rgba(116,181,65,1)] to-[rgba(116,180,65,0.5)]",
      },
      title: "text-green-2",
      imgPath: "/images/middle-student.png",
      buttons: {
        primary: "text-white bg-green-1",
        secondary: "text-green-2 bg-green-4",
      }
    },
    yorisu: {
      bgCircles: {
        left: "from-[rgba(97,180,141,1)] to-[rgba(97,180,141,0.7)]",
        right: "from-[rgba(116,181,65,1)] to-[rgba(116,180,65,0.5)]",
      },
      title: "text-green-2",
      imgPath: "",
      buttons: {
        primary: "text-white bg-green-1",
        secondary: "text-green-2 bg-green-4",
      }
    },
    sigma: {
      bgCircles: {
        left: "from-[rgba(97,180,141,1)] to-[rgba(97,180,141,0.7)]",
        right: "from-[rgba(116,181,65,1)] to-[rgba(116,180,65,0.5)]",
      },
      title: "text-green-2",
      imgPath: "",
      buttons: {
        primary: "text-white bg-green-1",
        secondary: "text-green-2 bg-green-4",
      }
    },
  }
  
  return <section ref={sectionRef} className="relative w-full h-screen min-h-[800px]">
    <div className="flex justify-center items-center w-full h-full absolute top-0 left-0">
      <div className="relative 2xl:w-[80rem] xl:w-[72rem] lg:w-[56rem] md:w-[48rem] sm:w-[36rem] w-full">
        <BgCircle styleClass={ElementsByType[type].bgCircles.left} position="left" />
        <BgCircle styleClass={ElementsByType[type].bgCircles.right} position="right" />
      </div>
      <div className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-30 backdrop-blur-[160px]"></div>
    </div>
    <div className="flex justify-center items-center w-full h-full absolute top-0 left-0 NanumSquare">
      <div className="2xl:w-[80rem] xl:w-[72rem] lg:w-[56rem] md:w-[48rem] sm:w-[36rem] w-full min-w-[300px] px-5 h-full flex lg:flex-row flex-col-reverse items-center justify-center lg:justify-between gap-10 lg:gap-0 pt-28 md:pt-20 lg:pt-0">
        <div>
          <div className="text-[#555] text-xl md:text-2xl xl:text-3xl font-bold mb-2.5">
            {subtitle}
          </div>
          <div className={`${ElementsByType[type].title} text-[40px] md:text-[50px] xl:text-[60px] font-extrabold NanumSquare`}>
            {title}
          </div>
          <div className="mt-10 flex gap-2.5 md:gap-5">
            {Object.entries(CommonButtons).map(([key, value]) => {
              const buttonKey = key as keyof typeof ElementsByType[typeof type]['buttons'];
              return <ReactiveButton key={`${key}-${value.text}`} props={{onClick: value.onClick}}>
                <div className={`${ElementsByType[type].buttons[buttonKey]} text-sm md:text-lg xl:text-xl font-bold px-[20px] md:px-[30px] py-[10px] md:py-[15px] rounded-full border border-transparent`}>
                  {value.text}
                </div>
              </ReactiveButton>
            })}
          </div>
        </div>
        <div className={`xl:w-[380px] xl:h-[380px] md:w-[320px] md:h-[320px] w-[280px] h-[280px] relative rounded-full bg-gradient-to-b shadow-xl ${type == 'elementary' ? 'from-yellow-1 to-yellow-3' : 'from-green-1 to-green-2'}`}>
          <div className='absolute bottom-0 w-full flex justify-center rounded-bl-full rounded-br-full overflow-hidden'>
            <img src={ElementsByType[type].imgPath} alt='curriculum' className={`${type == 'elementary' ? 'w-[64%]' : 'w-full'}`}/>
          </div>
        </div>
      </div>
    </div>
  </section>;
};

export default HeroSection;