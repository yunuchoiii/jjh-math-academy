import useIntersection from "@/app/_hooks/useIntersection";

interface FeaturesSectionProps {
  title: React.ReactNode;
  subtitle: React.ReactNode;
  features: {
    title: string;
    description: string;
  }[];
  backgroundColor?: "green" | "yellow";
}

const FeaturesSection = ({ title, subtitle, features, backgroundColor }: FeaturesSectionProps) => {
  const { ref, isIntersected } = useIntersection(0.5);

  const bgColor = backgroundColor === "green" ? "bg-[#ecf6e6]" : "bg-[#fffbe2]";
  return <section className={`flex justify-center items-center w-full py-20 md:pt-[120px] md:pb-[140px] ${bgColor}`}>
    <div className="2xl:w-[80rem] xl:w-[72rem] lg:w-[56rem] md:w-[48rem] sm:w-[36rem] w-full min-w-[300px] px-5">
      <div className="text-center text-base sm:text-lg">
        {subtitle}
      </div>
      <div className="text-center text-lg sm:text-2xl mt-2.5">
        {title}
      </div>
      <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[10px] md:gap-[30px] mt-[60px]">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className={`flex flex-col gap-[10px] px-[40px] py-[30px] bg-white rounded-[30px] shadow-3 transition-opacity duration-500 ${isIntersected ? 'fade-in-bottom' : 'opacity-0'}`}
            style={{
              animationDelay: `${index * 0.5}s`,
              animationDuration: '0.5s',
            }}
          >
            <div className="text-lg font-bold">{feature.title}</div>
            <div className="flex-1 text-base flex items-center">{feature.description}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
}

export default FeaturesSection;