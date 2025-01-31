"use client";

import StickyButtons, { StickyButtonProps } from "@/app/_components/Button/StickyButtons";
import HeroSection from "@/app/_components/LandingSection/HeroSection";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "usehooks-ts";

const YorisuPage = () => {
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const stickyButtons:StickyButtonProps[] = [
    {
      label: "요리수 연산 교실",
      color: "yellow",
      isActive: true,
    },
    {
      label: "시그마 클래스",
      onClick: () => router.push("/advanced-math/sigma-class"),
      color: "green",
      isActive: false,
    },
  ];

  return <div 
    className="home-root flex flex-col items-center -mt-[50px] md:-mt-[180px]"
  >
    <StickyButtons buttons={stickyButtons} />
    <HeroSection
      title="요리수 연산 교실"  
      subtitle="재미있고 탄탄하게!"
      type="yorisu"
    />
  </div>;
};

export default YorisuPage;