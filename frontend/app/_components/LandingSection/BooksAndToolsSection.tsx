"use client";

import useIntersection from "@/app/_hooks/useIntersection";
import Image from "next/image";
import { useMediaQuery } from "usehooks-ts";

interface SectionProps {
  title: string;
  imageSrc: string;
  imageClass: string;
  items: string[];
  features: string[];
  itemType: "book" | "tool";
  color: "green" | "yellow";
}

const Section = ({ title, imageSrc, imageClass, items, features, itemType, color }: SectionProps) => (
  <div className="h-full flex flex-col gap-5 p-2.5 pb-6 rounded-[30px] shadow-3 NanumSquare">
    <div className={`relative w-full aspect-[1.8] rounded-[22px] overflow-hidden ${itemType === "book" ? (color === "green" ? "bg-green-4" : "bg-yellow-4") : ""}`}>
      <Image 
        src={imageSrc} 
        alt={itemType} 
        fill 
        sizes="100%"
        className={imageClass} 
      />
    </div>
    <div className="flex flex-col gap-4 px-3 flex-1">
      <div className={`w-fit text-sm font-bold px-2.5 py-1 rounded-full ${color === "green" ? "bg-green-4 bg-opacity-50 text-green-2" : "bg-yellow-4 bg-opacity-50 text-yellow-6"}`}>
        {title} 활용 {itemType === "book" ? "교재" : "교구"}
      </div>
      <h3 className="flex-1 text-lg font-extrabold break-keep flex items-center">
        {features.map((feature, index) => (
          <span key={`${index}-${feature}`} className="text-lg font-extrabold">
            {feature}
          </span>
        ))}
      </h3>
      <div className="flex flex-wrap gap-2.5">
        {items.map((item, index) => (
          <div 
            key={`${index}-${itemType}`} 
            className={`bg-lightgray-2 font-bold px-2.5 py-[3px] rounded-[6px] whitespace-nowrap`}
          >
            {item}
          </div>
        ))}
        <span className="leading-none">...</span>
      </div>
    </div>
  </div>
);

interface BooksAndToolsSectionProps {
  title: string;
  books: string[];
  tools: string[];
  featuresOfBooks: string[];
  featuresOfTools: string[];
  color: "green" | "yellow";
}

const BooksAndToolsSection = ({ title, books, tools, featuresOfBooks, featuresOfTools, color }: BooksAndToolsSectionProps) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { ref, isIntersected } = useIntersection(isMobile ? 0.2 : 0.8);

  return <div ref={ref} className="flex justify-center items-center w-full">
    <div className="2xl:w-[80rem] xl:w-[72rem] lg:w-[56rem] md:w-[48rem] sm:w-[36rem] w-full max-w-[995px] min-w-[300px] px-5 md:py-[120px] py-[60px]">
      <h2 className={`text-2xl font-extrabold NanumSquare text-center mb-12 ${color === "yellow" ? "text-yellow-5" : "text-green-2"}`}>
        {title}에서는 <br className="block md:hidden"/>어떤 교재와 교구를 사용할까요?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px]">
        <div 
          className={isIntersected ? "fade-in-bottom" : "opacity-0"}
          style={{
            animationDuration: "0.5s",
          }}
        >
          <Section 
            title={title}
            imageSrc="/images/sigma-class-books.png" 
            imageClass="object-contain -rotate-45 scale-[250%]" 
            items={books} 
            itemType="book"
            features={featuresOfBooks}
            color={color}
          />
        </div>
        <div 
          className={isIntersected ? "fade-in-bottom" : "opacity-0"}
          style={{
            animationDelay: "0.2s",
            animationDuration: "0.5s",
          }}
        >
          <Section 
            title={title}
            imageSrc="/images/learning-tools-2.png" 
            imageClass="object-cover" 
            items={tools} 
            itemType="tool"
            features={featuresOfTools}
            color={color}
          />
        </div>
      </div>
    </div>
  </div>
}

export default BooksAndToolsSection;