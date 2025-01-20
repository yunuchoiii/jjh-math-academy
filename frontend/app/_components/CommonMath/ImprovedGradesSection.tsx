"use client";

import useIntersection from "@/app/_hooks/useIntersection";
import { useMediaQuery } from "usehooks-ts";
import SpeechBubble from "../Quote/SpeechBubble";

interface ImprovedGradesSectionProps {
  speechBubbleText: {
    left: React.ReactNode;
    right: React.ReactNode;
  };
  improvedGradesList: {
    id: number;
    student: string;
    description: React.ReactNode;
  }[];
}

const ImprovedGradesSection = ({ speechBubbleText, improvedGradesList }: ImprovedGradesSectionProps) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const { ref: firstRef, isIntersected: isFirstIntersected } = useIntersection(0.3);
  const { ref: secondRef, isIntersected: isSecondIntersected } = useIntersection(isMobile ? 0.2 : 0.4);

  return (
    <div className="flex justify-center items-center w-full pt-20 pb-[120px]">
      <div className="2xl:w-[80rem] xl:w-[72rem] lg:w-[56rem] md:w-[48rem] sm:w-[36rem] w-full max-w-[995px] px-5">
        <div ref={firstRef} className="flex flex-col gap-5">
          <div
            className={`flex justify-start pr-10 ${isFirstIntersected ? "fade-in-bottom" : "opacity-0"}`}
            style={{
              animationDelay: "0.3s",
              animationDuration: "0.6s",
            }}
          >
            <SpeechBubble color="#4C7E82" backgroundColor="#EBF1F1" position="left">
              {speechBubbleText.left}
            </SpeechBubble>
          </div>
          <div
            className={`flex justify-end pl-10 ${isFirstIntersected ? "fade-in-bottom" : "opacity-0"}`}
            style={{
              animationDelay: "1.2s",
              animationDuration: "0.6s",
            }}
          >
            <SpeechBubble color="#A48104" backgroundColor="#FFECA8" position="right">
              {speechBubbleText.right}
            </SpeechBubble>
          </div>
        </div>
        <div
          ref={secondRef}
          className={`mt-32 border-2 border-[#D7D7D7] rounded-[40px] md:rounded-[50px] shadow-3 flex flex-col md:gap-[30px] gap-[20px] justify-center items-center md:py-[50px] py-[20px] md:px-[30px] px-[20px] transition-all duration-1000 ${isSecondIntersected ? "bg-[#F9F9F9]" : "bg-white"}`}
        >
          {improvedGradesList.map((item, index) => (
            <div
              key={`improved-grade-${item.id}`}
              className={`w-full md:w-[66%] py-[30px] px-5 bg-white rounded-[30px] flex flex-col gap-[20px] justify-center items-center shadow-2 break-keep ${isSecondIntersected ? "fade-in-bottom" : "opacity-0"}`}
              style={{
                animationDelay: 0.5 + index * 0.5 + "s",
                animationDuration: "0.5s",
              }}
            >
              <div className="text-[#666] md:text-base text-sm"># {item.student}</div>
              <div className="md:text-lg text-base leading-relaxed text-center">
                {item.description}
              </div>
            </div>
          ))}
          <div className="md:pb-2.5 pb-5 pt-5 flex flex-col items-center justify-center gap-[10px]">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={`dot-${index}`} className="w-[5px] h-[5px] bg-[#7D7D7D] rounded-[30px]"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImprovedGradesSection;