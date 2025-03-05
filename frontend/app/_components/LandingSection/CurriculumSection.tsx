"use client";

import useIntersection from "@/app/_hooks/useIntersection";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

type Curriculum = {
  grade: string;
  title: string;
  description: string;
  tags: string[];
}

interface CurriculumSectionProps {
  title: string;
  curriculums: Curriculum[];
  color: "green" | "yellow";
}

const CurriculumCard = ({curriculum, color, isIntersected, index}: {curriculum: Curriculum, color: "green" | "yellow", isIntersected: boolean, index: number}) => {
  const scrollContainerRef = useRef<HTMLUListElement>(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        setIsAtStart(scrollLeft === 0);
        setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 1);
      }
    };

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      handleScroll();
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const colorClassMap = {
    green: {
      bgColor: "bg-green-4",
      borderColor: "border-green-4",
    },
    yellow: {
      bgColor: "bg-yellow-4",
      borderColor: "border-yellow-4",
    }
  };

  return (
    <article 
      key={`${curriculum.grade}-${curriculum.title}`}
      className={`flex flex-col min-w-[350px] h-[205px] px-[30px] py-[20px] bg-white rounded-[30px] shadow-[0_4px_24px_rgba(0,0,0,0.1)] border-2 ${colorClassMap[color].borderColor} transition-opacity duration-500 ${isIntersected ? 'fade-in-bottom' : 'opacity-0'}`}
      style={{
        animationDelay: `${index * 0.15}s`,
        animationDuration: '0.5s',
      }}
    >
      <div className="-ml-2.5 flex items-center gap-2.5">
        <h3 className={`${colorClassMap[color].bgColor} px-3 py-1 font-semibold rounded-full whitespace-nowrap`}>
          {curriculum.grade}
        </h3>
        <h2 className="text-lg font-semibold">
          {curriculum.title}
        </h2>
      </div>
      <div className="flex-1 flex items-center text-base">
        {curriculum.description}
      </div>
      <div className="relative">
        <div className={`flex justify-start items-center absolute z-10 left-0 top-0 bottom-0 w-20 bg-gradient-to-l from-transparent to-white pointer-events-none transition-opacity duration-300 ${isAtStart ? "opacity-0" : "opacity-100"}`}>
        </div>
        <div className={`flex justify-end items-center absolute z-10 right-0 top-0 bottom-0 w-20 bg-gradient-to-r from-transparent to-white pointer-events-none transition-opacity duration-300 ${isAtEnd ? "opacity-0" : "opacity-100"}`}>
        </div>
        <ul
          className="relative flex justify-start items-center gap-2.5 overflow-x-auto scrollbar-hidden"
          ref={scrollContainerRef}
        >
          {curriculum.tags.map(tag => (
            <li key={`${curriculum.grade}-${tag}`} className="bg-[#F3F3F3] px-2.5 py-[3px] text-sm rounded-full whitespace-nowrap">
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

const CurriculumSection = ({title, curriculums, color}: CurriculumSectionProps) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { ref, isIntersected } = useIntersection(isMobile ? (curriculums.length > 4 ? 0.3 : 0.6) : 0.6);

  return <div className="flex justify-center items-center">
    <div ref={ref} className="2xl:w-[80rem] xl:w-[72rem] lg:w-[56rem] md:w-[48rem] sm:w-[36rem] w-full min-w-[300px] px-5 md:py-[120px] py-[60px] flex flex-col xl:flex-row md:justify-center items-center gap-0 md:gap-16">
      <div className={`flex flex-col gap-5 h-full justify-center items-center xl:items-end ${curriculums.length > 3 ? "flex-1" : ""}`}>
        <div className={`xl:block hidden relative ${curriculums.length > 3 ? "w-full" : "w-[350px]"} aspect-[1.5] rounded-2xl overflow-hidden shadow-2xl ${color === "green" ? "bg-[#DAE3D9]" : "bg-yellow-4 bg-opacity-70"} mb-5`}>
          <Image 
            src={color === "green" ? "/images/study-girl-photo.png" : "/images/two-schoolgirls-working-together-assignment-classroom-2.png"} 
            alt="curriculum-section-title" 
            fill
            className="object-cover"
          />
        </div>
        <h1 className={`text-3xl font-extrabold NanumSquare text-center ${color === "green" ? "text-green-2" : "text-yellow-5"}`}>{title}</h1>
        <h2 className="text-lg">
          체계적인 커리큘럼을 통해 <br/>
          학습 효과를 극대화합니다.
        </h2>
      </div>
      <div className="hidden md:block">
        <div className="flex justify-center gap-[30px]">
          {[0, 1].map(index => {
            if (curriculums.slice(index * 3, (index + 1) * 3).length === 0) return null;
            return <div key={index} className="flex flex-col gap-5 w-[350px] relative" style={{marginTop: index * 50, marginBottom: index * -50}}>
              {curriculums.slice(index * 3, (index + 1) * 3).map((curriculum, index) => (
                <CurriculumCard key={`${curriculum.grade}-${curriculum.title}`} curriculum={curriculum} color={color} isIntersected={isIntersected} index={index} />
              ))}
              <div className={`absolute -z-10 top-0 left-1/2 -translate-x-1/2 w-0.5 h-full bg-black bg-opacity-25 ${isIntersected ? 'fade-in' : 'opacity-0'}`} style={{animationDelay: "0.5s"}}></div>
            </div>
          })}
        </div>
      </div>
      <div className="grid md:hidden grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[10px] md:gap-[30px] mt-[60px]">
        {curriculums.map((curriculum, index) => (
          <CurriculumCard key={`${curriculum.grade}-${curriculum.title}`} curriculum={curriculum} color={color} isIntersected={isIntersected} index={index} />
        ))}
      </div>
    </div>
  </div>
}

export default CurriculumSection;