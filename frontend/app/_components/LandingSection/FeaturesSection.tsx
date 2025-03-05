"use client";

import useIntersection from "@/app/_hooks/useIntersection";
import { useMediaQuery } from "usehooks-ts";

interface FeaturesSectionProps {
  title: React.ReactNode;
  subtitle: React.ReactNode;
  features: {
    title: string;
    description: string;
    icon: string;
  }[];
  backgroundColor?: "green" | "yellow";
}

const FeaturesSection = ({ title, subtitle, features, backgroundColor }: FeaturesSectionProps) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { ref, isIntersected } = useIntersection(isMobile ? 0.6 : 1);

  const gridCols = features.length % 4 === 0 ? "xl:grid-cols-4" : features.length % 3 === 0 ? "xl:grid-cols-3" : "xl:grid-cols-2";

  const bgColor = backgroundColor === "green" ? "bg-[#ecf6e6]" : "bg-[#fffbe2]";
  return <section className={`flex justify-center items-center w-full py-20 md:pt-[120px] md:pb-[140px] ${bgColor}`}>
    <div className="2xl:w-[80rem] xl:w-[72rem] lg:w-[56rem] md:w-[48rem] sm:w-[36rem] w-full min-w-[300px] px-5">
      <h2 className="text-center text-base sm:text-lg">
        {subtitle}
      </h2>
      <h1 className="text-center text-lg sm:text-2xl mt-2.5">
        {title}
      </h1>
      <div ref={ref} className={`grid grid-cols-1 md:grid-cols-2 gap-[10px] md:gap-[30px] mt-[60px] ${gridCols}`}>
        {features.map((feature, index) => (
          <article 
            key={index} 
            className={`relative flex flex-col gap-[10px] px-[40px] py-[30px] bg-white rounded-[30px] shadow-3 transition-opacity duration-500 ${isIntersected ? 'swelling-in-center' : ''}`}
            style={{
              animationDelay: `${index * 0.1}s`,
              animationDuration: '0.5s',
            }}
          >
            <div className={`w-[50px] h-[50px] rounded-full ${backgroundColor === "green" ? "bg-green-4" : "bg-yellow-4"} flex items-center justify-center mb-2`}>
              <i className={`${feature.icon} ${backgroundColor === "green" ? "text-green-2" : "text-yellow-6"} text-xl`}></i>
            </div>
            <h3 className="text-lg font-bold break-keep">{feature.title}</h3>
            <p className="flex-1 text-base flex items-center">{feature.description}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
}

export default FeaturesSection;