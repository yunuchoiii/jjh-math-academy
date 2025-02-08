import useIntersection from "@/app/_hooks/useIntersection";
import Link from "next/link";
import { useMediaQuery } from "usehooks-ts";
import SpeechBubble from "../Quote/SpeechBubble";

interface ReactionBubblesProps {
  title: string;
  color: "green" | "yellow";
  reactions: React.ReactNode[];
  teacherWords: React.ReactNode;
}

const contact = <Link href="/#contact-section" className="flex items-center gap-1 group">
  <span className="group-hover:font-bold transition-all duration-300">지금 바로 상담 받아보세요</span>
  <i className="fas fa-arrow-right text-xs group-hover:translate-x-1 transition-all duration-300"></i>
</Link>

const ReactionBubbles = ({ title, color, reactions, teacherWords }: ReactionBubblesProps) => {
  const allReactions = [...reactions, teacherWords, contact];

  const isMobile = useMediaQuery("(max-width: 768px)");
  const { ref, isIntersected } = useIntersection(isMobile ? 0.3 : 0.5);

  return <div className="flex justify-center items-center w-full">
    <div className="2xl:w-[80rem] xl:w-[72rem] lg:w-[56rem] md:w-[48rem] sm:w-[36rem] w-full max-w-[995px] min-w-[300px] px-5 md:py-[120px] py-[60px]">
      <div className="bg-[#444] p-[5px] md:p-5 rounded-[30px] md:rounded-[40px] shadow-2xl">
        <div className="relative flex flex-col bg-white rounded-[25px] overflow-hidden">
          <div className="relative w-full h-14 border-b border-[#DDD] flex items-center justify-center">
            <i className="fas fa-chevron-left absolute left-6 top-1/2 -translate-y-1/2"></i>
            <p className="font-bold NanumSquare text-black">
              조재현 수학학원&nbsp;
              <span className={`font-extrabold ${color === "green" ? "text-green-2" : "text-yellow-5"}`}>
                "{title}"
              </span>
            </p>
          </div>
          <div ref={ref} className="relative flex flex-col gap-5 px-5 md:px-8 pt-6 md:pt-10 pb-10 ">
            {allReactions.map((reaction, index) => {
              const isTeacher = index >= reactions.length;
              return <div 
                key={`${title}-reaction-${index}`} 
                className={`relative flex transition-all duration-500 ${isTeacher ? "justify-end" : "justify-start"} ${isIntersected ? "fade-in-bottom opacity-100" : " opacity-0"}`}
                style={{
                  animationDelay: `${index * 0.7}s`,
                }}
              >
                <SpeechBubble 
                  color={isTeacher ? "blue" : color} 
                  position={isTeacher ? "right" : "left"}
                  profile={
                    isTeacher ? 
                    {name: "선생님", image: "/images/icons/female-user.png"} : 
                    {name: `${String.fromCharCode(65+index)} 학생 학부모님`}
                  }
                >
                  <div className="font-medium">
                    {reaction}
                  </div>
                </SpeechBubble>
              </div>
          })}
          </div>
        </div>
      </div>
    </div>
  </div>
}

export default ReactionBubbles;