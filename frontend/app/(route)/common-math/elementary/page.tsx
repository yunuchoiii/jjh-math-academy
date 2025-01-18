import HeroSection from "@/app/_components/CommonMath/HeroSection";
import ImprovedGradesSection from "@/app/_components/CommonMath/ImprovedGradesSection";

const ElementaryMathPage = () => {
  return <div className="home-root flex flex-col items-center -mt-[140px]">
    <HeroSection
      title="초등 교과 수학"
      subtitle="기초부터 심화까지 재미있고 탄탄하게!"
      type="elementary"
    />
    <ImprovedGradesSection />
  </div>;
};

export default ElementaryMathPage;