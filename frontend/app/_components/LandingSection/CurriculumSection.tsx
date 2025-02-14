"use client";

import useIntersection from "@/app/_hooks/useIntersection";
import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

interface CurriculumSectionProps {
  title: string;
  curriculums: {
    grade: string;
    title: string;
    description: string;
    tags: string[];
  }[];
  color: "green" | "yellow";
}

const CurriculumSection = ({title, curriculums, color}: CurriculumSectionProps) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { ref, isIntersected } = useIntersection(isMobile ? (curriculums.length > 4 ? 0.3 : 0.6) : 1);

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

  return <div className="flex justify-center items-center">
    <div className="2xl:w-[80rem] xl:w-[72rem] lg:w-[56rem] md:w-[48rem] sm:w-[36rem] w-full min-w-[300px] px-5 md:py-[120px] py-[60px]">
      <h2 className="text-3xl font-extrabold NanumSquare text-center">{title}</h2>
      <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[10px] md:gap-[30px] mt-[60px]">
        {curriculums.map((curriculum, index) => {
          const scrollContainerRef = useRef<HTMLDivElement>(null);
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

          return (
            <div 
              key={`${curriculum.grade}-${curriculum.title}`}
              className={`flex flex-col px-[30px] py-[20px] bg-white rounded-[30px] shadow-[0_4px_24px_rgba(0,0,0,0.1)] border-2 ${colorClassMap[color].borderColor} transition-opacity duration-500 ${isIntersected ? 'swelling-in-center' : ''}`}
              style={{
                animationDelay: `${index * 0.1}s`,
                animationDuration: '0.5s',
              }}
            >
              <div className="-ml-2.5 flex items-center gap-4">
                <div className={`${colorClassMap[color].bgColor} px-5 py-1 font-semibold rounded-full`}>
                  {curriculum.grade}
                </div>
                <div className="text-lg font-semibold">
                  {curriculum.title}
                </div>
              </div>
              <div className="flex-1 flex items-center text-base my-4">{curriculum.description}</div>
              <div className="relative">
                <div className={`flex justify-start items-center absolute z-10 left-0 top-0 bottom-0 w-20 bg-gradient-to-l from-transparent to-white pointer-events-none transition-opacity duration-300 ${isAtStart ? "opacity-0" : "opacity-100"}`}>
                </div>
                <div className={`flex justify-end items-center absolute z-10 right-0 top-0 bottom-0 w-20 bg-gradient-to-r from-transparent to-white pointer-events-none transition-opacity duration-300 ${isAtEnd ? "opacity-0" : "opacity-100"}`}>
                </div>
                <div
                  className="relative flex justify-start items-center gap-2.5 overflow-x-auto scrollbar-hidden"
                  ref={scrollContainerRef}
                >
                  {curriculum.tags.map(tag => (
                    <div key={`${curriculum.grade}-${tag}`} className="bg-[#F3F3F3] px-2.5 py-[3px] text-sm rounded-full whitespace-nowrap">
                      {tag}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </div>
}

export default CurriculumSection;